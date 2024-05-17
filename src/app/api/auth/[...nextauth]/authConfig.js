function isAuthenticatedPage(authenticatedPages, currentPage) {
    //console.log(authenticatedPages);

    for (const page of authenticatedPages) {
        if (page === 'ORGLANDING' && currentPage.split("/").length === 2) {
            return true;
        }
        if (page === 'APILISTING' && currentPage.match(/(.*(apis))/)) {
            return true;
        }
        if (page === 'APILANDING' && currentPage.match(/(.*(api)(?!s).*)/)) {
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

let prof;

export const authConfig = {
    pages: {
        signIn: '/signIn',
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const organizationName = nextUrl.pathname.split("/")[1];
            if (isLoggedIn) {
                return true;
            } else {
                const organisationDetails = await fetch(process.env.ADMIN_API_URL + "admin/organisation?orgName=" + organizationName);
                const orgDDetailResponse = await organisationDetails.json();
                return !handleAuth(orgDDetailResponse, nextUrl.pathname);
            }
        }
    },
    providers: [],
}
