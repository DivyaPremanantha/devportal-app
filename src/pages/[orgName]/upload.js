import React, { useState } from 'react';
import './upload.css';

export async function getServerSideProps(context) {
    var content = {}
    console.log('Generating zip file...');

    var file_system = require('fs');
    var archiver = require('archiver');

    // var output = file_system.createWriteStream(context.params.orgName + '.zip');
    var output = file_system.createWriteStream("./public/test" + '.zip');

    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(process.cwd() + "/../../public", false);

    // append files from a sub-directory and naming it `new-subdir` within the archive
    archive.directory('subdir/', 'new-subdir');

    archive.finalize();
    content.orgName = context.params.orgName;
    // content.test = await fs.readFile('MNMTaxiSolution.zip', 'utf8');

    // console.log('test:', content.test);
    return { props: { content } }

}


export default function Upload({ content }) {

    // Define state variables for each input
    const [orgName, setOrgName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [authenticatedPages, setAuthenticatedPages] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            orgName,
            isPublic,
            authenticatedPages: authenticatedPages.split(',').map(page => page.trim()), // Convert to an array
        };

        try {
            const orgResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + 'organisation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await orgResponse.json();
            if (!orgResponse.ok) {
                throw new Error('Failed to submit form data');
            } else {

                const zipResponse = await fetch("/" + formData.orgName + '.zip');

                if (!zipResponse.ok) {
                    throw new Error('Failed to fetch zip file from local repository');
                }
                const zipArrayBuffer = await zipResponse.arrayBuffer();
                const zipBlob = new Blob([zipArrayBuffer], { type: 'application/zip' });
                const orgContentResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + 'orgContent?orgName=' + formData.orgName, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/zip',
                    },
                    body: zipBlob,
                });
                await orgContentResponse.json();
                console.log('Form Data Submitted:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
                <label htmlFor="orgName">Organization Name:</label>
                <input
                    type="text"
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="isPublic">Is Public:</label>
                <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="authenticatedPages">Authenticated Pages (comma separated):</label>
                <input
                    type="text"
                    id="authenticatedPages"
                    value={authenticatedPages}
                    onChange={(e) => setAuthenticatedPages(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
}
