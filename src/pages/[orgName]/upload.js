import React, { useState } from 'react';
import './upload.css';
import { promises as fs } from 'fs';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';

export async function getServerSideProps(context) {
    var content = {}
    content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');

    let response = JSON.parse(await fs.readFile(process.cwd() + "/../../public/resources/orgContent.json", 'utf8'));
    content.orgName = response.orgName;
    content.isPublic = response.isPublic;
    content.authenticatedPages = response.authenticatedPages;

    console.log('Generating zip file...');

    var file_system = require('fs');
    var archiver = require('archiver');

    // var output = file_system.createWriteStream(context.params.orgName + '.zip');
    var output = file_system.createWriteStream("./public/" + response.orgName + '.zip');
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(process.cwd() + "/../../public", false);
    archive.directory('subdir/', 'new-subdir');
    archive.finalize();

    return { props: { content } }

}


export default function Upload({ content }) {
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {};
        formData.orgName = content.orgName,
            formData.isPublic = content.isPublic,
            formData.authenticatedPages = content.authenticatedPages;

        try {
            setIsSubmitting(true);
            const orgResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + 'organisation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await orgResponse.json();
            console.log('Form Data Submitted:', result);
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
                let response = await orgContentResponse;
                console.log('Form Data Submitted:', result);
                console.log('Org Content Submitted:', orgContentResponse);

                if (orgContentResponse.ok) {
                    window.confirm('Form submitted successfully!');
                } else {
                    window.confirm('Failed to submit form data');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // Re-enable form submission button after submission process is complete
        }
    };

    return (
        <div>
            <Navbar content={content} />
            <div class="content">
                <div class="form-container">
                    <form onSubmit={handleSubmit} className="request-form">
                        <div className="form-group">
                            <label htmlFor="orgName">
                                <span className="label-text">Organization Name:</span> <span className="value-text">{content.orgName}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="isPublic">
                                <span className="label-text">Is Public:</span> <span className="value-text">{content.isPublic ? 'True' : 'False'}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="authenticatedPages">
                                <span className="label-text">Authenticated Pages:</span> <span className="value-text">{content.authenticatedPages}</span>
                            </label>
                        </div>
                        <button type="submit" className={`submit-button ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'} {/* Change button text while submitting */}
                        </button>
                    </form>
                </div>
            </div>
            <Footer content={content} />
        </div>
    );
}
