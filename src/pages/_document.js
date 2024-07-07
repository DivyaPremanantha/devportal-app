import React from "react"
import { Html, Head, Main, NextScript } from 'next/document'
import { promises as fs } from 'fs';

const stylesheetsRef = require(process.cwd() + "/public/resources/mock/cssList.json");

export default function Document({content}) {

  return (
    <Html lang="en">
      <Head>
        {stylesheetsRef.stylesheets.map((item, index) => (
          <link rel="stylesheet" href={`http://localhost:3000/resources/stylesheet/${item}`}/>

        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}