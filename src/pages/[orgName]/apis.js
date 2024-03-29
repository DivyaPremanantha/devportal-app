import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import Tile from './tile';

export async function getServerSideProps(context) {
  const content = {}
  content.orgName = context.params.orgName;

  var navRef;
  var componentRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/components-page.html", 'utf8');
    content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/../../public/resources/content-mock/apiMedatada.json", 'utf8'));

    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  } else {
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/nav-bar.html"
    componentRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/components-page.html"

    const navResponse = await fetch(navRef)
    content.navContent = await navResponse.text()

    const componentResponse = await fetch(componentRef);
    content.componentsHTMLContent = await componentResponse.text();

    const apiArtifactRef = process.env.NEXT_PUBLIC_API + "apiMetadata/apiList?orgName=" + context.params.orgName;
    const apiResponse = await fetch(apiArtifactRef);
    content.apiResources = await apiResponse.json();

  }

  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  return (
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