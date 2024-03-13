import React from 'react';
import { useEffect } from 'react';
import Navbar from '../../app/navbar';
import { useRouter } from "next/router";
import Footer from '../../app/footer';
import { promises as fs } from 'fs';


export async function getServerSideProps(context) {
  const content = {}
  var htmlRef;
  var navRef;
  var footerRef;
  var stylesheetRef;
  var mainStylesheetRef;
  var yamlRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.orgHTMLContent = await fs.readFile(process.cwd() + "/../../resources/template/org-landing-page.html", 'utf8');
    content.stylesheetContent = await fs.readFile(process.cwd() + "/../../resources/stylesheet/org-landing-page.css", 'utf8');
    content.mainStylesheetContent = await fs.readFile(process.cwd() + "/../../resources/stylesheet/style.css", 'utf8');
    content.orgContent = JSON.parse(await fs.readFile(process.cwd() + "/../../resources/content/orgContent.json", 'utf8')).orgLandingPageContent;
    content.navContent = await fs.readFile(process.cwd() + "/../../resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../resources/template/footer.html", 'utf8');
  } else {
    htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/org-landing-page.html"
    stylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/stylesheet/org-landing-page.css"
    mainStylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/stylesheet/style.css"
    yamlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/content/orgContent.json"
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/template/nav-bar.html"

    const yamlResponse = await fetch(yamlRef)
    const yamlContent = await yamlResponse.json()
    content.orgContent = yamlContent.orgLandingPageContent;

    const htmlResponse = await fetch(htmlRef)
    const htmlContent = await htmlResponse.text()
    content.orgHTMLContent = htmlContent

    const navResponse = await fetch(navRef)
    const navContent = await navResponse.text()
    content.navContent = navContent

    const footerResponse = await fetch(footerRef)
    const footerContent = await footerResponse.text()
    content.navContent = footerContent

    const stylesheetResponse = await fetch(stylesheetRef);
    const stylesheetContent = await stylesheetResponse.text();
    content.stylesheetContent = stylesheetContent;

    const mainStylesheetResponse = await fetch(mainStylesheetRef);
    const mainStylesheetContent = await mainStylesheetResponse.text();
    content.mainStylesheetContent = mainStylesheetContent;
  }

  content.orgName = context.params.orgName;
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
    <div>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer content={content}/>
    </div>
  );
}
