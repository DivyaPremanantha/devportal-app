import '../components.css';
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
  var mainStylesheetRef;
  var componentRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.mainStylesheetContent = await fs.readFile(process.cwd() + "/../../resources/stylesheet/style.css", 'utf8');
    content.navContent = await fs.readFile(process.cwd() + "/../../resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../resources/template/footer.html", 'utf8');
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/../../resources/template/components-page.html", 'utf8');
    content.apiArtifacts = JSON.parse(await fs.readFile(process.cwd() + "/../../resources/content/apiMedatada.json", 'utf8'));

    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  } else {
    mainStylesheetRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/stylesheet/style.css"
    navRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/nav-bar.html"
    componentRef = process.env.NEXT_PUBLIC_HOST + context.params.orgName + "/resources/template/components-page.html"

    const navResponse = await fetch(navRef)
    const navContent = await navResponse.text()
    content.navContent = navContent;

    const mainStylesheetResponse = await fetch(mainStylesheetRef);
    const mainStylesheetContent = await mainStylesheetResponse.text();
    content.mainStylesheetContent = mainStylesheetContent;

    const componentResponse = await fetch(componentRef);
    const componentContent = await componentResponse.text();
    content.componentsHTMLContent = componentContent;

    const apiArtifactRef = process.env.NEXT_PUBLIC_API + "apiMetadata/apiList?orgName=" + context.params.orgName;
    const apiResponse = await fetch(apiArtifactRef);
    const apiContent = await apiResponse.json();
    content.apiArtifacts = apiContent;

  }

  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;


  var apiList = content.apiContent
  useEffect(() => {
    // apiList.forEach(function(element) {
    //   {
    //     for (const [key, value] of Object.entries(element.apiInfo.apiArtifacts[0].apiInfo.apiArtifacts.apiContent)) {
    //     if (document.getElementById(key) !== null) {
    //       document.getElementById(key).innerHTML = value;
    //     }
    //     }
    //     for (const [key, value] of Object.entries(element.apiInfo.apiArtifacts[0].apiInfo.apiArtifacts.apiImages)) {
    //     if (document.getElementById(key) !== null) {
    //       const apiImage = document.getElementById(key);
    //       apiImage.src = value;
    //     }
    //   }
    //   }
    //  });

    

    const styleElement = document.createElement('style');
    styleElement.innerHTML = content.mainStylesheetContent;
    document.head.appendChild(styleElement);

  }, []);

  return (
    console.log(content.isParentHTMLPresent),
    <div>
      <Navbar content={content} />
      {content.componentsHTMLLineCount > 14 ? (
        <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      ) : (
          <Tile content={content} />
      )}
      <Footer content={content} />
    </div>
  );

}