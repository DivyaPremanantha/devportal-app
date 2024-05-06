import * as React from 'react';
import RedocScript from './tryoutscript';


export function getServerSideProps(context) {

    const organisation = context.params.orgName;
    const apiName = context.params.apiName;
    return { props: { organisation, apiName } };
}


export default function Tryout({ organisation, apiName }) {

    return (
        <div>
            <RedocScript orgName={organisation} apiName={apiName}/>
        </div>
    )

}



