import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import Tile from './tile';
import { getToken } from "next-auth/jwt"
import { useEffect } from "react";
import './error.css';
import Handlebars from "handlebars";

function editAPIDetails(content) {
  var apiList = content.apiResources;
  var editedAPIList = [];
  let userRoles = [];
  for (var i = 0; i < apiList.length; ++i) {
    var imagePath = apiList[i].apiInfo.apiArtifacts.apiImages["api-detail-page-image"]
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
      apiList[i].apiInfo.imagePath = imagePath;
    } else if (process.env.NEXT_PUBLIC_STORAGE === "DB") {
      apiList[i].apiInfo.imagePath = process.env.NEXT_PUBLIC_METADATA_LOCAL_API_URL + imagePath.split('/images/')[1]
        + "?orgName=" + content.orgName + "&apiID=" + apiList[i].apiInfo.apiName;
    } else {
      apiList[i].apiInfo.imagePath = process.env.NEXT_PUBLIC_AWS_URL + content.orgName + imagePath;
    }
    var auth = apiList[i].apiInfo.authorizedRoles;
    var authorized = false;
    if (auth != undefined && auth.length > 0 && auth[0] !== "") {
      userRoles = content.token.role.split(" ")
    } else {
      authorized = true;
    }
    for (const role of userRoles) {
      if (auth.includes(role)) {
        authorized = true;
        break;
      }
    }
    apiList[i].apiInfo.authorized = authorized;

    editedAPIList.push(apiList[i]);
  }
  return editedAPIList;
}

export async function getServerSideProps(context) {
  const content = {}
  var navRef;
  var componentRef;
  var footerRef;
  var tileRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.componentsHTMLContent = await fs.readFile(process.cwd() + "/public/resources/layouts/components-page.inc", 'utf8');
    content.apiResources = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/apiMedatada.json", 'utf8'));
    content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
    let response = JSON.parse(await fs.readFile(process.cwd() + "/public/resources/mock/orgContent.json", 'utf8'));
    content.orgName = response.orgName;
  } else {
    try {
      const token = await getToken({ req: context.req, secret: process.env.AUTH_SECRET })

      navRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=nav-bar.html";
      componentRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=components-page.html";
      footerRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=footer.html";
      tileRef = process.env.NEXT_PUBLIC_ADMIN_API_URL + "orgFiles?orgName=" + context.params.orgName + "&fileName=apitile.html";
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
        content.componentsHTMLContent = await fs.readFile(process.cwd() + "/src/pages/[orgName]/error.html", 'utf8');
      }

      const apiArtifactRef = process.env.NEXT_PUBLIC_METADATA_API_URL + "apiList?orgName=" + context.params.orgName;
      const apiResponse = await fetch(apiArtifactRef);
      content.apiResources = await apiResponse.json();
      console.log("API");

      console.log(content.apiResources);
      content.token = token;
    } catch (error) {
      console.error('Error fetching API content:', error);
      content.componentsHTMLContent = '<h3>Please upload API content</h3>';
    }
  }
  content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  content.apiResources = editAPIDetails(content);
  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    window.getAPIMetadata = () => getAPIMetadataProps(content);
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

  const template = Handlebars.compile(content.componentsHTMLContent);
  const context = { details: getAPIMetadataProps(content)};
  console.log(context.details.apiList[0].apiInfo.apiName);


  const html = template(context);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export function getAPIMetadataProps(content) {
  return {
    apiList: content.apiResources,
  }
}
