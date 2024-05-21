import * as React from 'react';
import { API } from '@stoplight/elements';
import dynamic from "next/dynamic";


export async function getServerSideProps(context) {


    const content = {}
    const organisation = context.params.orgName;
    const apiName = context.params.apiName;
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        content.pageHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/tryout.html", 'utf8');
    } else {
        const htmlRef = process.env.ADMIN_API_URL + "admin/tryout.html?orgName=" + organisation;
        const htmlResponse = await fetch(htmlRef);
        var htmlContent = await htmlResponse.text();
        var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + organisation + `/resources/stylesheet/`);
        content.pageHTMLContent = modifiedHTMLContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + organisation + `/resources/images/`);
    }
    if (content.hasOwnProperty("pageHTMLContent")) {
        content.pageHTMLLineCount = content.pageHTMLContent.split(/\r\n|\r|\n/).length;
    } else {
        content.pageHTMLLineCount = 1;
    }
    const url = process.env.NEXT_PUBLIC_METADATA_API_LOCAL_URL + "apiMetadata/apiDefinition?orgName=" + organisation + "&apiID=" + apiName;
    const swaggerResponse = await fetch(url);
    const swaggerText = await swaggerResponse.text();
    content.organisation = organisation;
    content.apiName = apiName;
    content.swagger = swaggerText;
    return { props: { content } };
}

export default function Tryout({ content }) {

    const TryoutScript = dynamic(() => import('./tryoutscript'), { ssr: false })
    return (
        <div>
            {content.pageHTMLLineCount > 14 ? (
                <div dangerouslySetInnerHTML={{ __html: content.pageHTMLContent }}></div>
            ) : (
                <TryoutScript content={content} />
            )}
        </div>
    )
}
