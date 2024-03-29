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
  var orgContent;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.orgHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/org-landing-page.html", 'utf8');
    content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');
  } else {
    htmlRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/org-landing-page.html"
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/nav-bar.html"
    footerRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/footer.html";

    const htmlResponse = await fetch(htmlRef)
    content.orgHTMLContent = await htmlResponse.text()

    const orgContentResponse = await fetch(orgContent)
    content.orgContent = await orgContentResponse.json()

    const navResponse = await fetch(navRef)
    content.navContent = await navResponse.text()

    const footerResponse = await fetch(footerRef)
    content.footerContent = await footerResponse.text()
  }

  content.orgName = context.params.orgName;
  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {

  const router = useRouter();
  router.asPath = "/" + content.orgName;

  return (
    <div>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer content={content} />
    </div>
  );
}
