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

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    content.orgHTMLContent = await fs.readFile(process.cwd() + "/../../public/resources/template/org-landing-page.html", 'utf8');
    content.navContent = await fs.readFile(process.cwd() + "/../../public/resources/template/nav-bar.html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/../../public/resources/template/footer.html", 'utf8');
  } else {
    htmlRef = process.env.ADMIN_API_URL + "admin/org-landing-page.html?orgName=" + context.params.orgName ;
    navRef = process.env.ADMIN_API_URL + "admin/nav-bar.html?orgName=" + context.params.orgName ;
    footerRef = process.env.ADMIN_API_URL + "admin/footer.html?orgName=" + context.params.orgName ;

    const htmlResponse = await fetch(htmlRef)
    var htmlContent = await htmlResponse.text()

    var modifiedHTMLContent = htmlContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
    content.orgHTMLContent = modifiedHTMLContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);

    const navResponse = await fetch(navRef)
    var navContent = await navResponse.text()
    var modifiedNavContent = navContent.replace('/resources/stylesheet/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/stylesheet/`);
    content.navContent = modifiedNavContent.replace('/resources/images/', process.env.NEXT_PUBLIC_AWS_URL + context.params.orgName + `/resources/images/`);

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
