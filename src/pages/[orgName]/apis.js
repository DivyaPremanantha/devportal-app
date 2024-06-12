import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import Tile from './tile';
import { getToken } from "next-auth/jwt"
import { useEffect } from "react";
import './document.css';

export async function getServerSideProps(context) {
  const content = {}
  var navRef;
  var componentRef;
  var footerRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.navContent = await fs.readFile(process.cwd() + "/public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/public/resources/template/footer.html", 'utf8');
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/public/resources/template/components-page.html", 'utf8');
    content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/content-mock/apiMedatada.json", 'utf8'));
    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
    let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/orgContent.json", 'utf8'));
    content.orgName = response.orgName;
  } else {
    try {
      const token = await getToken({ req: context.req, secret: process.env.AUTH_SECRET })

      navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=nav-bar.html";
      componentRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=components-page.html" ;
      footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=footer.html";
      const componentResponse = await fetch(componentRef);
      content.orgName = context.params.orgName;

      if (componentResponse.ok) {
        var contentRef = await componentResponse.text();
        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()
        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()

        if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
          content.componentsHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
          content.navContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
        } else {
          content.componentsHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
          content.navContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
        }
      } else {
        content.componentsHTMLContent = await fs.readFile(process.cwd() + "/src/pages/[orgName]/document.html", 'utf8');
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
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "PROD" && process.env.NEXT_PUBLIC_STORAGE === "DB") {
      var imageTags = document.getElementsByTagName("img");
      var imageTagList = Array.prototype.slice.call(imageTags);
      imageTagList.forEach(element => {
        var imageName = element.src.split("/images/")[1];
        if (element.src.includes("/resources/images")) {
          element.src = process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + 'orgFiles?orgName=' + content.orgName + "&fileName=" + imageName;
        }
      });
    }
  }, []);

  return (
    <div>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      {content.componentsHTMLLineCount > 14 && content.componentsHTMLLineCount == 31 ? (
        <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      ) : (
        <Tile content={content} />
      )}
      <Footer content={content} />
    </div>
  );

}