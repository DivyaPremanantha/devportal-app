import React, { useState } from 'react';
import './upload.css';

export default function Upload({ content }) {
    // Define state variables for each input
    const [orgName, setOrgName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [authenticatedPages, setAuthenticatedPages] = useState('');
    const [response, setResponse] = useState(null);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            orgName,
            isPublic,
            authenticatedPages: authenticatedPages.split(',').map(page => page.trim()), // Convert to an array
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + 'organisation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setResponse(result);
            console.log('Form Data Submitted:', result);
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
