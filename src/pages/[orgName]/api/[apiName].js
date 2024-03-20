import Navbar from '../../../app/navbar';
import Footer from '../../../app/footer';
import { Helmet } from "react-helmet";
import Markdown from 'react-markdown'
import { createRoot } from 'react-dom/client'
import rehypeRaw from 'rehype-raw'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { promises as fs } from 'fs';
import React from 'react';

export async function getServerSideProps(context) {
    const content = {}
    var htmlRef;
    var apiContentRef;
    var apiContentRefMD;
    var navRef;
    var footerRef;

    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        content.apiHTMLContent = await fs.readFile(process.cwd() + "/../../resources/template/api-landing-page.html", 'utf8');
        content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/../../resources/content/" + context.params.apiName + "/apiMedatada.json", 'utf8'));
        content.apiPage = await fs.readFile(process.cwd() + "/../../resources/content/" + context.params.apiName + "/apiContent.md", 'utf8');
        content.navContent = await fs.readFile(process.cwd() + "/../../resources/template/nav-bar.html", 'utf8');
        content.footerContent = await fs.readFile(process.cwd() + "/../../resources/template/footer.html", 'utf8');

    } else {
        htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/api-landing-page.html"
        apiContentRef = process.env.NEXT_PUBLIC_API + "apiMetadata/api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        apiContentRefMD = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/content/apiContent.md";
        navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/template/nav-bar.html";
        footerRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/template/footer.html";

        const navResponse = await fetch(navRef)
        const navContent = await navResponse.text()
        content.navContent = navContent;

        const footerResponse = await fetch(footerRef)
        const footerContent = await footerResponse.text()
        content.footerContent = footerContent;
    
        const res = await fetch(htmlRef);
        const htmlContent = await res.text();
        content.apiHTMLContent = htmlContent;
    
        const resp = await fetch(apiContentRef);
        const apiContent = await resp.json();
        content.apiArtifacts = apiContent.apiInfo.apiArtifacts;
    
        const apiMDRes = await fetch(apiContentRefMD);
        const apiPageContent = await apiMDRes.text();
        content.apiPage = apiPageContent;
    
    }

    content.orgName = context.params.orgName;
    content.apiName = context.params.apiName;

    // Pass data to the page via props
    return { props: { content } }
}

function API({ content }) {
    const router = useRouter();
    router.asPath = "/" + content.orgName;

    useEffect(() => {
        for (const [key, value] of Object.entries(content.apiResources.apiInfo.apiArtifacts.apiContent)) {
            if (document.getElementById(key) !== null) {
                document.getElementById(key).innerHTML = value;
            }
        }

        for (const [key, value] of Object.entries(content.apiResources.apiInfo.apiArtifacts.apiImages)) {
            if (document.getElementById(key) !== null) {
                const apiImage = document.getElementById(key);
                apiImage.src = value;
            }
        }

        //render rest of the API Landin Page content through a markdown
        createRoot(document.getElementById("api-details")).render( <Markdown rehypePlugins={[rehypeRaw]}>{content.apiPage}</Markdown> );

    }, []);

    return (
        <div>
            <Navbar content={content}/>
            <div dangerouslySetInnerHTML={{ __html: content.apiHTMLContent }}></div>
            <Footer content={content}/>
        </div>
    )
}

export default API;