import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import Tile from './tile';
import { getToken } from "next-auth/jwt"
import { useEffect } from "react";


export async function getServerSideProps(context) {
  const content = {}
  content.orgName = context.params.orgName;

  var navRef;
  var componentRef;
  var footerRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/components-page.html", 'utf8');
    content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/../../public/resources/content-mock/apiMedatada.json", 'utf8'));

    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  } else {
    try {
      const token = await getToken({ req: context.req, secret: process.env.AUTH_SECRET })

      navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "nav-bar.html?orgName=" + context.params.orgName;
      componentRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "components-page.html?orgName=" + context.params.orgName;
      footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "footer.html?orgName=" + context.params.orgName;
      const componentResponse = await fetch(componentRef);

      if (componentResponse.ok) {
        var contentRef = await componentResponse.text();
        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()
        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()

        if (process.env.NEXT_PUBLIC_AWS_URL === "") {
          content.componentsHTMLContent = contentRef.replace('/resources/stylesheet/components.css', process.env.NEXT_PUBLIC_ADMIN_API_URL + "components.css?orgName=" + context.params.orgName);
          content.navContent = navContent.replace('/resources/stylesheet/style.css', process.env.NEXT_PUBLIC_ADMIN_API_URL + "style.css?orgName=" + context.params.orgName);
        } else {
          content.componentsHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
          content.navContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
        }
      } else {
        content.componentsHTMLContent = '<h3>Please upload API content</h3>';
      }

      const apiArtifactRef = process.env.NEXT_PUBLIC_METADATA_API_URL + "apiList?orgName=" + context.params.orgName;
      const apiResponse = await fetch(apiArtifactRef);
      content.apiResources = await apiResponse.json();
      content.token = token;
    } catch (error) {
      console.error('Error fetching API content:', error);
      content.componentsHTMLContent = '<h3>Please upload API content</h3>';
    }
  }
  content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;

  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    var imageTags = document.getElementsByTagName("img");
    var imageTagList = Array.prototype.slice.call(imageTags);
    imageTagList.forEach(element => {
      var imageName = element.src.split("/images/")[1];
      if (element.src.includes("/resources/images")) {
        element.src = process.env.NEXT_PUBLIC_ADMIN_API_URL + imageName + '?orgName=' + content.orgName;
      }
    });
  }, []);
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