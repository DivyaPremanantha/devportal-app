import Navbar from '../../../app/Navbar';
import Footer from '../../../app/Footer';
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const content = {}

    console.log(process.env.HOST);

    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/resources/APILandingPage/template/api-landing-page.html")
    const htmlContent = await res.text()
    content.orgContent = htmlContent
    content.orgName = context.params.orgName;
    content.apiName = context.params.apiName;

    // Pass data to the page via props
    return { props: { content } }
}

export const LoadAPIContent = (filePath) => {
    fetch(filePath)
        .then(response => response.json())
        .then(apiData => {
            var data = apiData.apiInfo.additionalProperties;
            console.log(data);
            if (data !== null) {
                for (const [key, value] of Object.entries(data)) {
                    if (document.getElementById(key) !== null) {
                        document.getElementById(key).innerHTML = value;
                    }
                }
            }
            return apiData;
        })
}

function API({ content }) {
    const stylesheetRef = process.env.NEXT_PUBLIC_HOST + "/resources/APILandingPage/stylesheet/api-landing-page.css";
    LoadAPIContent(process.env.NEXT_PUBLIC_METADATA_API);
    const router = useRouter();
    router.asPath = "/" + content.orgName;

    return (
        <>
            <Helmet>
                <link href={stylesheetRef} rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" />
            </Helmet>
            <div>
                <Navbar />
                <div dangerouslySetInnerHTML={{ __html: content.orgContent }}></div>
                <Footer />
            </div>
        </>
    )
}
export default API;