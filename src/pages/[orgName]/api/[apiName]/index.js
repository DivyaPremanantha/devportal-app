import { useRouter } from "next/router";
import { useEffect } from "react";
import { promises as fs } from 'fs';
import * as React from 'react';
import './../../../../../src/app/api.css'
import Handlebars from "handlebars";
import { marked } from 'marked';

export async function getServerSideProps(context) {
    const content = {}
    var htmlRef;
    var apiContentRef;
    var apiContentRefMD;
    var navRef;
    var footerRef;

    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        content.apiHTMLContent = await fs.readFile(process.cwd() + "/public/resources/layouts/api-landing-page.inc", 'utf8');
        try {
            content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/" + context.params.apiName + "/apiMedatada.json", 'utf8'));
        } catch (e) {
            content.apiHTMLContent = '<h3>API not found</h3>';
        }
        try {
            content.apiPage = await fs.readFile(process.cwd() + "/public/resources/mock/" + context.params.apiName + "/apiContent.md", 'utf8');
        } catch (e) {
            content.apiPage = 'API content not uploaded';
        }
        let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/orgContent.json", 'utf8'));
        content.orgName = response.orgName;
    } else {
        htmlRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=api-landing-page.html";
        apiContentRef = process.env.NEXT_PUBLIC_METADATA_API_URL + "api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        apiContentRefMD = process.env.NEXT_PUBLIC_METADATA_API_URL + "apiContent.md?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
        navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=nav-bar.html";
        footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=footer.html";
        content.orgName = context.params.orgName;

        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()

        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()

        const htmlContent = await fetch(htmlRef);
        var contentRef = await htmlContent.text();

        if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
            content.navContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
            content.apiHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
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

    content.apiName = context.params.apiName;

    if (content.apiResources != null && content.apiResources.apiInfo != null) {
        let value = content.apiResources.apiInfo.apiArtifacts.apiImages["api-landing-page-image"];
        if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV")
            content.apiImageSrc = value;
        else if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
            var fileName = value.split('images/')[1];
            content.apiImageSrc = process.env.NEXT_PUBLIC_METADATA_LOCAL_API_URL + fileName + "?orgName=" + content.orgName + "&apiID=" + content.apiName;
        } else {
            content.apiImageSrc = process.env.NEXT_PUBLIC_AWS_URL + content.orgName + value;
        }
    }

    // Pass data to the page via props
    return { props: { content } }
}

function API({ content }) {
    const router = useRouter();
    // router.asPath = "/" + content.orgName;

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DEPLOYMENT === "PROD" && process.env.NEXT_PUBLIC_STORAGE === "DB") {
            var imageTags = document.getElementsByTagName("img");
            var imageTagList = Array.prototype.slice.call(imageTags);
            imageTagList.forEach(element => {
                if (element.src.includes("/resources/images")) {
                    var imageName = element.src.split("/images/")[1];
                    element.src = process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'orgFiles?orgName=' + content.orgName + "&fileName=" + imageName;
                }
            });
        }
    }, []);

    const template = Handlebars.compile(content.apiHTMLContent);
    const context = { details: getAPIProps(content) };
    const html = template(context);

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            {content.apiResources != null &&
                <div class="relative">
                    <div class="card">
                        <div class="container">
                            <h4>
                                <a href={content.apiResources.apiInfo.apiName + "/tryout"} class="try-out-link"> Try It Out </a>
                            </h4>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default API;

export function getAPIProps(content) {
    return {
        apiResources: content.apiResources,
        apiPage: marked(content.apiPage),
        apiImageSrc: content.apiImageSrc,
    }
}