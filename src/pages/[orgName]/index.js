import React from "react";
import Navbar from '../../app/Navbar';
import Footer from '../../app/Footer';
import {Helmet} from "react-helmet";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const orgName = context.params.orgName;
  const content = {}

  console.log(process.env.HOST);

  const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/resources/OrgLandingPage/template/org-landing-page.html")
  const htmlContent = await res.text()
  content.orgContent = htmlContent
  content.orgName = orgName
  
  // Pass data to the page via props
  return { props: { content } }
}

export default function Page({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  const stylesheetRef = process.env.NEXT_PUBLIC_HOST + "/resources/OrgLandingPage/stylesheet/org-landing-page.css"

  return (
    <>
      <Helmet>
        <link href={stylesheetRef}  rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <div className="div">
        <Navbar />
        <div dangerouslySetInnerHTML={{__html : content.orgContent}}></div>
        <Footer />
      </div>
    </>
  );
}
