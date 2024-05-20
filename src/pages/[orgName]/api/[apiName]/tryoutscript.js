
import * as React from 'react';
import Head from 'next/head';



export default function RedocScript({ content }) {

const url = "http://localhost:9090/apiMetadata/apiDefinition?orgName=" + content.organisation + "&apiID=" + content.apiName

  return (
    <>
      <Head>
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css"></link>
      </Head>
      <body>
        <elements-api apiDescriptionUrl={url} router="hash" layout="sidebar" />
      </body>
    </>
  )
}
