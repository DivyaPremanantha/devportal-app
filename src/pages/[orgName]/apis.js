import React from 'react';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';
import { useRouter } from "next/router";
import { promises as fs } from 'fs';
import Tile from './tile';
import { getToken } from "next-auth/jwt"


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

      navRef = process.env.ADMIN_API_URL + "admin/nav-bar.html?orgName=" + context.params.orgName;
      componentRef = process.env.ADMIN_API_URL + "admin/components-page.html?orgName=" + context.params.orgName;
      footerRef = process.env.ADMIN_API_URL + "admin/footer.html?orgName=" + context.params.orgName;

      const navResponse = await fetch(navRef)
      var navContent = await navResponse.text()
      var modifiedNavContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
      content.navContent = modifiedNavContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);

      const componentResponse = await fetch(componentRef);
      var contentRef = await componentResponse.text();
      content.componentsHTMLContent = contentRef.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);

      const footerResponse = await fetch(footerRef)
      content.footerContent = await footerResponse.text()

      const apiArtifactRef = process.env.METADATA_API_URL + "apiMetadata/apiList?orgName=" + context.params.orgName;
      const apiResponse = await fetch(apiArtifactRef);
      content.apiResources = await apiResponse.json();
      content.token = token;
    } catch (error) {
      console.error('Error fetching API content:', error);
      content.componentsHTMLContent = '<h3>Please upload API content</h3>';
    }
  }
  content.componentsHTMLLineCount = content.componentsHTMLContent.split(/\r\n|\r|\n/).length;
  console.log(content.componentsHTMLLineCount);

  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  return (
    <div>
      <Navbar content={content} />
      {/* <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div> */}
      {content.componentsHTMLLineCount > 14 || content.componentsHTMLLineCount == 1 ? (
        <div dangerouslySetInnerHTML={{ __html: content.componentsHTMLContent }}></div>
      ) : (
        <Tile content={content} />
      )}
      <Footer content={content} />
    </div>
  );

}