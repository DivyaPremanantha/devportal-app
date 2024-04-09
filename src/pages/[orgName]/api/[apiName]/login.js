import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'

function Login() {
    const { data: session, status } = useSession();
    const router = useRouter()
    if (status == "loading") {
        if (Object.keys(router.query).length > 0) {
            signIn("asgardeo", { callbackUrl: router.asPath.split("/login")[0] });
        }
    } 
}

export default Login;