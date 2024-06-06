import Navbar from '../../../../app/navbar';
import Footer from '../../../../app/footer';
import Markdown from 'react-markdown'
import { createRoot } from 'react-dom/client'
import rehypeRaw from 'rehype-raw'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { promises as fs } from 'fs';
import * as React from 'react';
import './../../../../../src/app/api.css'

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
        } catch (e) {
            content.apiHTMLContent = '<h3>API not found</h3>';
        }
        try {
            content.apiPage = await fs.readFile(process.cwd() + "/../../public/resources/content-mock/" + context.params.apiName + "/apiContent.md", 'utf8');
        } catch (e) {
            content.apiPage = 'API content not uploaded';
        }
        content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
        content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');

    } else {
        htmlRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api-landing-page.html?orgName=" + context.params.orgName;
        apiContentRef = process.env.NEXT_PUBLIC_METADATA_API_URL + "api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        apiContentRefMD = process.env.NEXT_PUBLIC_METADATA_API_URL + "apiContent.md?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "nav-bar.html?orgName=" + context.params.orgName;
        footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "footer.html?orgName=" + context.params.orgName;

        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()

        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()

        const htmlContent = await fetch(htmlRef);
        var contentRef = await htmlContent.text();

        if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
            content.navContent = navContent.replace('/resources/stylesheet/style.css', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "style.css?orgName=" + context.params.orgName);
            content.apiHTMLContent = contentRef.replace('/resources/stylesheet/api-landing-page.css', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "api-landing-page.css?orgName=" + context.params.orgName);
        } else {
            var modifiedNavContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
            content.navContent = modifiedNavContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);
            content.apiHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
        }
        const resp = await fetch(apiContentRef);
        if (resp.status != 200) {
            content.apiHTMLContent = '<h3>API not found</h3>';
        } else {
            content.apiResources = await resp.json();
        }

        const apiMDRes = await fetch(apiContentRefMD);
        if (apiMDRes.status != 200) {
            content.apiPage = 'API content not uploaded';
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
    // router.asPath = "/" + content.orgName;

    useEffect(() => {
        if (content.apiResources != null && content.apiResources.apiInfo != null) {
            for (const [key, value] of Object.entries(content.apiResources.apiInfo.apiArtifacts.apiImages)) {
                if (document.getElementById(key) !== null) {
                    const apiImage = document.getElementById(key);
                    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV")
                        apiImage.src = value;
                    else if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
                        var fileName = value.split('images/')[1];
                        apiImage.src = process.env.NEXT_PUBLIC_METADATA_LOCAL_API_URL + fileName + "?orgName=" + content.orgName + "&apiID=" + content.apiName;
                    } else
                        apiImage.src = process.env.NEXT_PUBLIC_AWS_URL + content.orgName + value;
                }
            }
            if (document.getElementById("api-landing-page-heading") != null)
                document.getElementById("api-landing-page-heading").innerHTML = content.apiResources.apiInfo.openApiDefinition.info.title;

            if (document.getElementById("api-landing-page-description") != null)
                document.getElementById("api-landing-page-description").innerHTML = content.apiResources.apiInfo.openApiDefinition.info.description;

            if (document.getElementById("api-version") != null)
                document.getElementById("api-version").innerHTML = content.apiResources.apiInfo.openApiDefinition.info.version;

            if (document.getElementById("api-url") != null)
                document.getElementById("api-url").innerHTML = content.apiResources.serverUrl.productionUrl;

            if (document.getElementById("api-url") != null)
                document.getElementById("api-url").href = content.apiResources.serverUrl.productionUrl;

            //render rest of the API Landin Page content through a markdown
            if (content.apiPage != null)
                createRoot(document.getElementById("api-details")).render(<Markdown rehypePlugins={[rehypeRaw]}>{content.apiPage}</Markdown>);
        }
        if (process.env.NEXT_PUBLIC_AWS_URL === undefined) {
            var imageTags = document.getElementsByTagName("img");
            var imageTagList = Array.prototype.slice.call(imageTags);
            imageTagList.forEach(element => {
                if (element.src.includes("/resources/images")) {
                    var imageName = element.src.split("/images/")[1];
                    element.src = process.env.NEXT_PUBLIC_ADMIN_API_URL + imageName + '?orgName=' + content.orgName;
                }
            });
        }
    }, []);

    return (
        <div>
            <Navbar content={content} />
            <div dangerouslySetInnerHTML={{ __html: content.apiHTMLContent }}></div>
            <div class="relative">
                <div class="card">
                    <div class="container">
                        <h4>
                            <a href={content.apiResources.apiInfo.apiName + "/tryout"} > {content.apiResources.apiInfo.apiName}</a>
                        </h4>
                    </div>
                </div>
            </div>
            <Footer content={content} />
        </div>
    )
}

export default API;