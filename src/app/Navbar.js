import { useEffect } from 'react';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


function Navbar({ content }) {

  useEffect(() => {
    if (document.getElementById("org-logo") != null) {
      document.getElementById("org-logo").href = "/" + content.orgName;
    }
    if (document.getElementById("org-home") != null) {
      document.getElementById("org-home").href = "/" + content.orgName;
    }
    if (document.getElementById("org-apis") != null) {
      document.getElementById("org-apis").href = "/" + content.orgName + "/apis";
    }
    if (document.getElementById("org-login") != null) {
      document.getElementById("org-login").href = "#";
      document.getElementById("org-login").addEventListener("click", function () {
        signIn("asgardeo");
      });
    }

    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
      const linkElement = document.createElement('a');
      linkElement.href = "/" + content.orgName + '/upload';

      const imgElement = document.createElement('img');
      imgElement.src = '/images/upload.png';
      imgElement.style.width = '50px';
      imgElement.style.height = '50px';

      linkElement.appendChild(imgElement);
      document.getElementById("nav-bar").appendChild(linkElement);
    } 
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content.navContent }}></div>
    </>
  )
}

export default Navbar;