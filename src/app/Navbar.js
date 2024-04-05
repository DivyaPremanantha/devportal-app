import { useEffect } from 'react';
import React from 'react';
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"


function Navbar({ content }) {
  const router = useRouter();

  console.log(content);

  useEffect(() => {
    document.getElementById("org-logo").href = "/" + content.orgName;
    document.getElementById("org-home").href = "/" + content.orgName;
    document.getElementById("org-apis").href = "/" + content.orgName + "/apis"; 
    document.getElementById("org-login").href = "#";
    document.getElementById("org-login").addEventListener("click", function () {
      signIn("asgardeo");
    });


  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content.navContent }}></div>
    </>
  )
}

export default Navbar;