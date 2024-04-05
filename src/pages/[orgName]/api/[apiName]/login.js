import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'

function Login({ context, content }) {
    const { data: session } = useSession();
    if (session === undefined) {
        const router = useRouter()
        if (router.query) {
            signIn("asgardeo", { callbackUrl: router.asPath.split("/login")[0] });
        }
    } 
    // else {
    //     try {
    //         const router = useRouter();
    //         router.push(router.asPath.split("/login")[0]);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export default Login;