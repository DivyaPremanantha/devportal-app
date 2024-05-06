
import * as React from 'react';
import Head from 'next/head';



export default function RedocScript({ orgName, apiName }) {
  var url = "http://localhost:9090/apiMetadata/apiDefinition?orgName="+ orgName+ "&apiID=" + apiName;

  return (


    <Head>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/redoc-try-it-out/dist/try-it-out.min.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            RedocTryItOut.init(
              "${url}",
              { title: "${apiName}" }, 
              document.getElementById("redoc_container")
            );
          `
        }}
      />
    </Head>
  )
}

