import { React, useEffect } from "react";
import Navbar from '../../app/navbar';
import { useRouter } from "next/router";
import { LoadCSS } from '../util';
import Footer from '../../app/Footer';


export async function getServerSideProps(context) {
  const content = {}
  var htmlRef;
  var navRef;
  var stylesheetRef;
  var mainStylesheetRef;
  var yamlRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    htmlRef = process.env.NEXT_PUBLIC_HOST + "resources/template/org-landing-page.html"
    stylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/stylesheet/org-landing-page.css"
    mainStylesheetRef = process.env.NEXT_PUBLIC_HOST + "resources/stylesheet/style.css"
    yamlRef = process.env.NEXT_PUBLIC_HOST + "resources/content/theme.json"
    navRef = process.env.NEXT_PUBLIC_HOST + "resources/template/nav-bar.html"

  } else {
    htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/org-landing-page.html"
    stylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/stylesheet/org-landing-page.css"
  }

  const yamlResponse = await fetch(yamlRef)
  const yamlContent = await yamlResponse.json()
  content.orgContent = yamlContent.orgLandingPageContent;
  content.theme = yamlContent.style;

  const htmlResponse = await fetch(htmlRef)
  const htmlContent = await htmlResponse.text()
  content.orgHTMLContent = htmlContent

  const navResponse = await fetch(navRef)
  const navContent = await navResponse.text()
  content.navContent = navContent

  const stylesheetResponse = await fetch(stylesheetRef);
  const stylesheetContent = await stylesheetResponse.text();
  content.stylesheetContent = stylesheetContent;

  const mainStylesheetResponse = await fetch(mainStylesheetRef);
  const mainStylesheetContent = await mainStylesheetResponse.text();
  content.mainStylesheetContent = mainStylesheetContent;

  content.orgName = context.params.orgName;
  content.stylesheetRef = stylesheetRef;

  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {

  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    if (document.getElementById("org-landing-page-section-one") !== null)
      document.getElementById("org-landing-page-section-one").innerHTML = content.orgContent.title;
    if (document.getElementById("org-landing-page-section-two") !== null)
      document.getElementById("org-landing-page-section-two").innerHTML = content.orgContent.description;
    if (document.getElementById("org-landing-page-image") !== null)
      document.getElementById("org-landing-page-image").src = content.orgContent.image;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = content.stylesheetContent;
    document.head.appendChild(styleElement);

  }, []);

  return (
    <>
      <Navbar content={content}/>
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer />
    </>
  );
}
