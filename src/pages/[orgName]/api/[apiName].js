import Navbar from '../../../app/Navbar';
import Footer from '../../../app/Footer';
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context) {
    const content = {}
    var htmlRef;
    var stylesheetRef;
    var apiContentRef;

    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        htmlRef = process.env.NEXT_PUBLIC_HOST + "resources/APILandingPage/template/api-landing-page.html"
        stylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/APILandingPage/stylesheet/api-landing-page.css";
        apiContentRef = process.env.NEXT_PUBLIC_HOST + "resources/APIMetadata/apiMedatada.json";

    } else {
        htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/APILandingPage/template/api-landing-page.html"
        stylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/APILandingPage/stylesheet/api-landing-page.css";
        apiContentRef = process.env.NEXT_PUBLIC_API + "apiMetadata/api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
    }

    const res = await fetch(htmlRef);
    const htmlContent = await res.text();
    content.orgContent = htmlContent;

    const resp = await fetch(apiContentRef);
    const apiContent = await resp.json();
    content.apiArtifacts = apiContent.apiInfo.apiArtifacts;

    const respo = await fetch(stylesheetRef);
    const stylesheetContent = await respo.text();
    content.stylesheetContent = stylesheetContent;

    content.orgName = context.params.orgName;
    content.apiName = context.params.apiName;

    // Pass data to the page via props
    return { props: { content } }
}

function API({ content }) {
    const router = useRouter();
    router.asPath = "/" + content.orgName;
    console.log(content.apiName);
    console.log(content.apiArtifacts.apiContent);

    useEffect(() => {
        for (const [key, value] of Object.entries(content.apiArtifacts.apiContent)) {
            if (document.getElementById(key) !== null) {
                document.getElementById(key).innerHTML = value;
            }
        }

        for (const [key, value] of Object.entries(content.apiArtifacts.apiImages)) {
            if (document.getElementById(key) !== null) {
                const apiImage = document.getElementById(key);
                apiImage.src = value;
            }
        }

        const styleElement = document.createElement('style');
        styleElement.innerHTML = content.stylesheetContent;
        document.head.appendChild(styleElement);

    }, []);

    return (
        <>
            <div>
                <Navbar />
                <div dangerouslySetInnerHTML={{ __html: content.orgContent }}></div>
                <Footer />
            </div>
        </>
    )
}

export default API;