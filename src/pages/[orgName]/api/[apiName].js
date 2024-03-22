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
        content.apiHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/api-landing-page.html", 'utf8');
        try {
            content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/../../public/resources/content-mock/" + context.params.apiName + "/apiMedatada.json", 'utf8'));
            content.apiPage = await fs.readFile(process.cwd() + "/../../public/resources/content-mock/" + context.params.apiName + "/apiContent.md", 'utf8');
        } catch (e) {
            content.apiPage = 'Please add API content';
        }
        content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
        content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');

    } else {
        htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/api-landing-page.html"
        apiContentRef = process.env.NEXT_PUBLIC_API + "apiMetadata/api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        apiContentRefMD = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/content/" + context.params.apiName + "/apiContent.md";
        navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/nav-bar.html";
        footerRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/footer.html";

        const navResponse = await fetch(navRef)
        content.navContent = await navResponse.text()

        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()

        const res = await fetch(htmlRef);
        content.apiHTMLContent = await res.text();

        const resp = await fetch(apiContentRef);
        content.apiResources = await resp.json();

        const apiMDRes = await fetch(apiContentRefMD);
        if (apiMDRes.status != 200) {
            content.apiPage = 'API not created';
        } else {
            content.apiPage = await apiMDRes.text();
        }
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
        if (content.apiResources != null) {
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
        }
        document.getElementById("api-version").innerHTML = content.apiResources.apiInfo.version;
        document.getElementById("api-url").innerHTML = content.apiResources.apiInfo.serverUrl.productionUrl;
        document.getElementById("api-url").href = content.apiResources.apiInfo.serverUrl.productionUrl;

        //render rest of the API Landin Page content through a markdown
        if (content.apiPage != null)
            createRoot(document.getElementById("api-details")).render(<Markdown rehypePlugins={[rehypeRaw]}>{content.apiPage}</Markdown>);

    }, []);

    return (
        <div>
            <Navbar content={content} />
            <div dangerouslySetInnerHTML={{ __html: content.apiHTMLContent }}></div>
            <Footer content={content} />
        </div>
    )
}

export default API;