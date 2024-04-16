import { NextAuthConfig } from 'next-auth';

import AsgardeoProvider from "next-auth/providers/asgardeo";



function checkAuthentication(currentPage) {
  // if (currentPage.split("/").length == 2) {
  //   console.log("Orglanding");
  //   console.log(currentPage);

  //   return true;
  // }

  if (currentPage.match(/(.*(apis))/)) {


    return true;
  }
  if (currentPage.match(/(.*(api)(?!s).*)/)) {

    return true;
  }
  return false;
}

function isAuthenticatedPage(authenticatedPages, currentPage) {


  for (const page of authenticatedPages) {
    // if (page == 'ORGLANDING' && currentPage.split("/").length == 2) {
    //   console.log("Orglanding");
    //   return true;
    // }

    if (page === 'APILISTING' && currentPage.match(/(.*(apis))/)) {
      console.log("API List");
      console.log(page)
      return true;
    }
    if (page === 'APILANDING' && currentPage.match(/(.*(api)(?!s).*)/)) {
      console.log("API Landing");
      console.log(currentPage);
      return true;
    }

  }
  return false;

}

function handleAuth(orgDDetailResponse, currentPage) {


  if (!orgDDetailResponse.isPublic) {
    const authenticatedPages = orgDDetailResponse["authenticatedPages"];
    console.log(authenticatedPages);

    console.log("orgDDetailResponse");

    console.log(orgDDetailResponse);
    if (isAuthenticatedPage(authenticatedPages, currentPage)) {

      console.log("Authenitcate");

      return true;

      //return NextResponse.redirect(new URL(request.nextUrl.href.split("/")[0]+ "/login"));
    }
    return false;
  }
  return false;
}

async function getOrgDetails(organizationName) {
  const organisationDetails = await fetch(process.env.ADMIN_API_URL + "admin/organisation?orgName=" + organizationName);
  const orgDDetailResponse = await organisationDetails.json();
  return orgDDetailResponse;
}
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("urllll");
      console.log(nextUrl.pathname);
      const shouldAuthenticate = checkAuthentication(nextUrl.pathname);
      const organizationName = nextUrl.pathname.split("/")[1];
      if (shouldAuthenticate) {
        if (isLoggedIn) {
          return true;
        } else {
          const orgDetailResponse = getOrgDetails(organizationName);
          const promise1 = Promise.resolve(orgDetailResponse);

          // const authorize = promise1.then((value) => {
          //   if (handleAuth(value, nextUrl.pathname)) {
          //     return false;
          //   } else {
          //     return true;
          //   }
          // });

          // const getAuth = () => {
          //   authorize.then((a) => {
          //     console.log("authorize promise");
          //     console.log(a);
          //   });
          // };

          // const auth = getAuth();
          // console.log("returned auth");

          // console.log(auth);
          // return auth;
          if( 1=== 1){
            return false;
          } else {
            return true;
          }

        }
      }
      return true;
    }
  },
  providers: [ ]
}


