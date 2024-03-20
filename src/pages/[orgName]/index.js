import React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '../../app/navbar';
import { useRouter } from "next/router";
import Footer from '../../app/footer';
import { promises as fs } from 'fs';

export async function getServerSideProps(context) {
  const content = {}
  var htmlRef;
  var navRef;
  var footerRef;
  var yamlRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.orgHTMLContent = await fs.readFile(process.cwd() + "/../../resources/template/org-landing-page.html", 'utf8');
    content.orgContent = JSON.parse(await fs.readFile(process.cwd() + "/../../resources/content/orgContent.json", 'utf8')).orgLandingPageContent;
    content.navContent = await fs.readFile(process.cwd() + "/../../resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../resources/template/footer.html", 'utf8');
  } else {
    htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/org-landing-page.html"
    yamlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/content/orgContent.json"
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/nav-bar.html"
    footerRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/footer.html";

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
    content.footerContent = footerContent;
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
    if (document.getElementById("org-landing-page-image") !== null) {
      document.getElementById("org-landing-page-image").src = content.orgContent.image;
    }

  }, []);

  return (
    <div>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer content={content} />
    </div>
  );
}
