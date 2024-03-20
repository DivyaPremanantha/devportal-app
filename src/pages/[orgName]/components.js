import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import { useEffect } from "react";
import Tile from './tile';

export async function getServerSideProps(context) {
  const content = {}
  content.orgName = context.params.orgName;

  var navRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.navContent = await fs.readFile(process.cwd() + "/../../resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../resources/template/footer.html", 'utf8');
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/../../resources/template/components-page.html", 'utf8');
    content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/../../resources/content/apiMedatada.json", 'utf8'));

    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  } else {
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "resources/template/nav-bar.html"

    const navResponse = await fetch(navRef)
    const navContent = await navResponse.text()
    content.navContent = navContent;
  }

  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  return (
    console.log(content.isParentHTMLPresent),
    <div>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      {content.componentsHTMLLineCount > 14 ? (
        <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      ) : (
        <Tile content={content} />
      )}
      <Footer content={content} />
    </div>
  );

}