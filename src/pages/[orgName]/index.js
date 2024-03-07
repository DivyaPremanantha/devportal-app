import { React, useEffect } from "react";
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
  content.orgHTMLContent = htmlContent

  const respo = await fetch(stylesheetRef);
  const stylesheetContent = await respo.text();
  content.stylesheetContent = stylesheetContent;

  content.orgName = context.params.orgName;
  content.stylesheetRef = stylesheetRef;

  var read = require('read-yaml');
  var config = read.sync('./public/resources/content/theme.yml');
  content.orgContent = config.orgLandingPageContent;

  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    document.getElementById("org-landing-page-section-one").innerHTML = content.orgContent.title;
    document.getElementById("org-landing-page-section-two").innerHTML = content.orgContent.description;
    document.getElementById("org-landing-page-image").src = content.orgContent.image;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = content.stylesheetContent;
    document.head.appendChild(styleElement);

  }, []);

  return (
    <>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer />
    </>
  );
}
