
import * as React from 'react';
import Head from 'next/head';



export default function RedocScript({ content }) {

const url = process.env.NEXT_PUBLIC_METADATA_API_LOCAL_URL + "apiMetadata/apiDefinition?orgName=" + content.organisation + "&apiID=" + content.apiName
  return (
    <>
      <Head>
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css"></link>
      </Head>
      <body>
        <elements-api apiDescriptionDocument={content.swagger} router="hash" layout="sidebar" />
      </body>
    </>
  )
}
