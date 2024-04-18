import { NextAuthConfig } from 'next-auth';





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
    if (currentPage.match(/(login)/)) {
        return false;
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
        return isAuthenticatedPage(authenticatedPages, currentPage);
    }
    return false;
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {

            const isLoggedIn = !!auth?.user;
            const shouldAuthenticate = checkAuthentication(nextUrl.pathname);
            const organizationName = nextUrl.pathname.split("/")[1];
            if (shouldAuthenticate) {
                if (isLoggedIn) {
                    return true;
                } else {
                    const organisationDetails = await fetch(process.env.ADMIN_API_URL + "admin/organisation?orgName=" + organizationName);
                    const orgDDetailResponse = await organisationDetails.json();
                    return !handleAuth(orgDDetailResponse, nextUrl.pathname);
                }
            } else {
                return true;
            }
        }
    },
    providers: []
}


