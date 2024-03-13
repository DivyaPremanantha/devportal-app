import React from 'react';

function Footer({content}) {

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: content.footerContent }}></div>
        </>
    )
}

export default Footer;