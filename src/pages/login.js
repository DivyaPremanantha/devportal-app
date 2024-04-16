import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
import { Message_data } from "../../context/context";
import { useContext } from "react";

function Login() {

    signIn("asgardeo");

    // const { data: session, status } = useSession();
    // const router = useRouter();
    // console.log("Login page==========");


    // if (status == "loading") {
    //     if (Object.keys(router.query).length > 0) {
    //         signIn("asgardeo");
    //     }
    // } 
}

export default Login;