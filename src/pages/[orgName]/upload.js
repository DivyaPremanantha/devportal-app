import React, { useState } from 'react';
import './upload.css';
import { promises as fs } from 'fs';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';

export async function getServerSideProps(context) {
    var content = {}
    content.navContent = await fs.readFile(process.cwd() + "/public/resources/pages/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/public/resources/pages/footer.html", 'utf8');

    let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/orgContent.json", 'utf8'));
    content.orgName = response.orgName;
    content.isPublic = response.isPublic;
    content.authenticatedPages = response.authenticatedPages;

    console.log('Generating zip file...');

    var file_system = require('fs');
    var archiver = require('archiver');
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
    archive.directory(process.cwd() + "/public/resources", "/resources");
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
            console.log('Submitting form with data:', formData);
            const zipResponse = await fetch("/" + formData.orgName + '.zip');

            if (!zipResponse.ok) {
                throw new Error('Failed to fetch zip file from local repository');
            }
            const zipArrayBuffer = await zipResponse.arrayBuffer();
            const zipBlob = new Blob([zipArrayBuffer], { type: 'application/zip' });

            const orgDetails = await fetch(process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'organisation?orgName=' + formData.orgName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let orgDetailResult = await orgDetails.json();

            console.log('orgDetailResult:', orgDetailResult);

            let contentUploadResponse;
            if (orgDetails.ok) {
                let orgResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'orgContent?orgName=' + formData.orgName, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/zip',
                    },
                    body: zipBlob,
                });
                contentUploadResponse = await orgResponse.text();

                if (orgResponse.ok) {
                    window.confirm('Modified content uploaded successfully!');
                } else {
                    window.confirm('Failed to upload content');
                }
            } else {
                let orgResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'organisation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const orgResponseJson = await orgResponse.json();

                if (orgResponse.ok) {
                    const orgContentResponse = await fetch(process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'orgContent?orgName=' + formData.orgName, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/zip',
                        },
                        body: zipBlob,
                    });
                    contentUploadResponse = await orgContentResponse.text();

                    if (orgContentResponse.ok) {
                        window.confirm('Content uploaded successfully!');
                        //TODO: Remove generated file
                    } else {
                        window.confirm('Failed to upload content');
                    }
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
                            {isSubmitting ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer content={content} />
        </div>
    );
}
