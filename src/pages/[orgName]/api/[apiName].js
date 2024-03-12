import Navbar from '../../../app/navbar';
import Footer from '../../../app/Footer';
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadCSS } from '../../util';

export async function getServerSideProps(context) {
    const content = {}
    var htmlRef;
    var stylesheetRef;
    var apiContentRef;
    var yamlRef;
    var navRef;
    var mainStylesheetRef;

    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        htmlRef = process.env.NEXT_PUBLIC_HOST + "resources/template/api-landing-page.html"
        stylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/stylesheet/api-landing-page.css";
        apiContentRef = process.env.NEXT_PUBLIC_HOST + "resources/content/apiMedatada.json";
        yamlRef = process.env.NEXT_PUBLIC_HOST + "resources/content/theme.json";
        mainStylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/stylesheet/style.css"
        navRef = process.env.NEXT_PUBLIC_HOST + "resources/template/nav-bar.html"

    } else {
        htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/api-landing-page.html"
        stylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/stylesheet/api-landing-page.css";
        apiContentRef = process.env.NEXT_PUBLIC_API + "apiMetadata/api?orgName=" + context.params.orgName + "&apiID=" + context.params.apiName;
    }
  
    const navResponse = await fetch(navRef)
    const navContent = await navResponse.text()
    content.navContent = navContent;
  
    const mainStylesheetResponse = await fetch(mainStylesheetRef);
    const mainStylesheetContent = await mainStylesheetResponse.text();
    content.mainStylesheetContent = mainStylesheetContent;
    
    const yamlResponse = await fetch(yamlRef)
    const yamlContent = await yamlResponse.json()
    content.orgContent = yamlContent.orgLandingPageContent;
    content.theme = yamlContent.style;

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

        LoadCSS(content);

    }, []);

    return (
        <>
            <Navbar content={content}/>
            <div dangerouslySetInnerHTML={{ __html: content.orgContent }}></div>
            <Footer />
        </>
    )
}

export default API;