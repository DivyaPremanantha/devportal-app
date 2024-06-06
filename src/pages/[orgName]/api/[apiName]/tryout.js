import * as React from 'react';
import Navbar from '../../../../app/navbar';
import Footer from '../../../../app/footer';
import dynamic from "next/dynamic";
import { promises as fs } from 'fs';
import { useEffect } from "react";

export async function getServerSideProps(context) {

    const content = {}
    const organisation = context.params.orgName;
    const apiName = context.params.apiName;
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        try {
            const swagger = JSON.parse(await fs.readFile(process.cwd() + "/../../public/resources/content-mock/" + apiName + "/apiMedatada.json", 'utf8')).apiInfo.openApiDefinition;
            content.swagger = JSON.stringify(swagger);
        } catch (e) {
            content.apiHTMLContent = '<h3>API not found</h3>';
        }
        content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
        content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');
    } else {
        const htmlRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "tryout.html?orgName=" + organisation;
        const navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "nav-bar.html?orgName=" + context.params.orgName;
        const footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "footer.html?orgName=" + context.params.orgName;
        const htmlResponse = await fetch(htmlRef);
        var htmlContent = await htmlResponse.text();
        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()
        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()

        if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
            content.navContent = navContent.replace('/resources/stylesheet/style.css', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "style.css?orgName=" + context.params.orgName);
            content.pageHTMLContent = htmlContent.replace('/resources/stylesheet/tryout.css', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "tryout.css?orgName=" + context.params.orgName);
        } else {
            content.pageHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + organisation + `/resources/stylesheet/`);
            content.navContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
        }

        const url = process.env.NEXT_PUBLIC_METADATA_API_URL + "apiDefinition?orgName=" + organisation + "&apiID=" + apiName;
        const swaggerResponse = await fetch(url);
        content.swagger = await swaggerResponse.text();
        content.orgName = organisation;
        content.apiName = apiName;
    }
    if (content.hasOwnProperty("pageHTMLContent")) {
        content.pageHTMLLineCount = content.pageHTMLContent.split(/\r\n|\r|\n/).length;
    } else {
        content.pageHTMLLineCount = 1;
    }

    return { props: { content } };
}

export default function Tryout({ content }) {

    if (process.env.NEXT_PUBLIC_AWS_URL === undefined) {
        useEffect(() => {
            var imageTags = document.getElementsByTagName("img");
            var imageTagList = Array.prototype.slice.call(imageTags);
            imageTagList.forEach(element => {
                if (element.src.includes("/resources/images")) {
                    var imageName = element.src.split("/images/")[1];
                    element.src = process.env.NEXT_PUBLIC_ADMIN_API_URL + imageName + '?orgName=' + content.orgName;
                }
            });
        }, []);
    }

    const TryoutScript = dynamic(() => import('./tryoutscript'), { ssr: false })
    return (
        <div>
            <Navbar content={content} />
            {content.pageHTMLLineCount > 14 ? (
                <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div>
            ) : (
                <TryoutScript content={content} />
            )}
            <Footer content={content} />
        </div>
    )
}
