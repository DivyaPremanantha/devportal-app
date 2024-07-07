import React from 'react';
import { useRouter } from 'next/router';
import { promises as fs } from 'fs';
import Navbar from '../../app/navbar';
import Footer from '../../app/footer';

export async function getServerSideProps(context) {
    const content = {}
    content.navContent = await fs.readFile(process.cwd() + "/public/resources/pages/nav-bar.inc", 'utf8');
    content.customHTML = await fs.readFile(process.cwd() + "/public/resources/pages/addtitonal-pages/" + context.params.fileName +".html", 'utf8');
    content.footerContent = await fs.readFile(process.cwd() + "/public/resources/pages/footer.inc", 'utf8');

    // content.customHTML = "";
    return { props: { content } }
}

export default function DynamicHtmlPage({content}) {

  return (
    <>
      <Navbar content={content} />
      <div dangerouslySetInnerHTML={{ __html: content.customHTML }} />
      <Footer content={content} />
    </>
  );
};

