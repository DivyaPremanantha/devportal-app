import React from 'react';
import Navbar from '../../app/navbar';
import { useRouter } from "next/router";
import Footer from '../../app/footer';
import { promises as fs } from 'fs';
import { useEffect } from "react";
import './error.css';

export async function getServerSideProps(context) {
  const content = {}
  var htmlRef;
  var navRef;
  var footerRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.orgHTMLContent = await fs.readFile(process.cwd() + "/public/resources/pages/org-landing-page.inc", 'utf8');
    let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/orgContent.json", 'utf8'));
    content.orgName = response.orgName;
  } else {
    htmlRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=org-landing-page.html";
    navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=nav-bar.html";
    footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=footer.html";
    content.orgName = context.params.orgName;

    try {
      const htmlResponse = await fetch(htmlRef)
      if (htmlResponse.ok) {
        var htmlContent = await htmlResponse.text()
        const navResponse = await fetch(navRef)
        var navContent = await navResponse.text()
        const footerResponse = await fetch(footerRef)
        content.footerContent = await footerResponse.text()

        if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
          var modifiedNavContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
          content.navContent = modifiedNavContent;
          var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_ADMIN_LOCAL_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=");
          content.orgHTMLContent = modifiedHTMLContent;
        } else {
          var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
          content.orgHTMLContent = modifiedHTMLContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);
          var modifiedNavContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
          content.navContent = modifiedNavContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);
        }
      } else {
        let orgContent = await fs.readFile(process.cwd() + "/src/pages/[orgName]/error.html", 'utf8');
        let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/orgContent.json", 'utf8'));
        content.orgHTMLContent = orgContent.replace('orgName', response.orgName);
      }

    } catch (error) {
      console.error('Error fetching org:', error);
      content.orgHTMLContent = await fs.readFile(process.cwd() + "/src/pages/[orgName]/error.html", 'utf8');
    }
  }

  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {

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
      <div dangerouslySetInnerHTML={{ __html: content.orgHTMLContent }}></div>
      <Footer content={content} />
    </div>
  );
}
