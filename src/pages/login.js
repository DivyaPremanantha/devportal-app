import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
//import { signIn } from '../../auth';

function Login() {

    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl) ?? "/";
    console.log("Login");
    console.log(callbackUrl);
    signIn("asgardeo");
    signIn("asgardeo", { callbackUrl: callbackUrl });

    // const { data: session, status } = useSession();
    // console.log("Login page==========");


    // if (status == "loading") {
    //     if (Object.keys(router.query).length > 0) {
    //         signIn("asgardeo");
    //     }
    // } 
}

export default Login;