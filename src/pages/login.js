import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'

function Login() {

    const router = useRouter();
    const redirect = (router.query.callbackUrl);
    signIn("asgardeo", { callbackUrl: redirect });
}

export default Login;