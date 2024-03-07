import { React, useEffect} from "react";
import Navbar from '../../app/Navbar';
import Footer from '../../app/Footer';
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const content = {}
  var htmlRef;
  var stylesheetRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    htmlRef = process.env.NEXT_PUBLIC_HOST + "resources/template/org-landing-page.html"
    stylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/stylesheet/org-landing-page.css"

  } else {
    htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/org-landing-page.html"
    stylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/stylesheet/org-landing-page.css"
  }

  const res = await fetch(htmlRef)
  const htmlContent = await res.text()
  content.orgContent = htmlContent

  const respo = await fetch(stylesheetRef);
  const stylesheetContent = await respo.text();
  content.stylesheetContent = stylesheetContent;


  content.orgName = context.params.orgName
  content.stylesheetRef = stylesheetRef

  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = content.stylesheetContent;
    document.head.appendChild(styleElement);

}, []);

  return (
    <>
      <div className="div">
        <Navbar />
        <div dangerouslySetInnerHTML={{ __html: content.orgContent }}></div>
        <Footer />
      </div>
    </>
  );
}
