import * as React from 'react';
import { API } from '@stoplight/elements';
import dynamic from "next/dynamic";

export async function getServerSideProps(context) {

    var swaggerInfo = {};
    const organisation = context.params.orgName;
    const apiName = context.params.apiName;
    swaggerInfo.organisation = organisation;
    swaggerInfo.apiName = apiName;
    return { props: { swaggerInfo } };
}

export default function Tryout({ swaggerInfo }) {

    const TryoutScript = dynamic(() => import('./tryoutscript'), { ssr: false })

    return (
        <div>
        <TryoutScript content={swaggerInfo} />
      </div>
    )

}



