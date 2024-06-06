function isAuthenticatedPage(authenticatedPages, currentPage) {
    for (const page of authenticatedPages) {
        if (page === 'ORGLANDING' && currentPage.split("/").length === 2) {
            return true;
        }
        if (page === 'APILISTING' && currentPage.match(/(.*(apis))/)) {
            return true;
        }
        if (page === 'APILANDING' && currentPage.match(/(.*(api)(?!s|(.*tryout)).*)/)) {
            return true;
        }
        if (page === 'APITRYOUT' && currentPage.match(/(.*(api)(?!s).*tryout)/)) {
            return true;
        }
    }
    return false;
}

function handleAuth(orgDDetailResponse, currentPage) {
    if (orgDDetailResponse.hasOwnProperty("isPublic") && !orgDDetailResponse.isPublic) {
        const authenticatedPages = orgDDetailResponse["authenticatedPages"];
        return isAuthenticatedPage(authenticatedPages, currentPage);
    }
    return false;
}

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
                if (process.env.NEXT_PUBLIC_DEPLOYMENT === "PROD") {
                    try {
                        const organisationDetails = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "organisation?orgName=" + organizationName);
                        const orgDDetailResponse = await organisationDetails.json();
                        return !handleAuth(orgDDetailResponse, nextUrl.pathname);

                    } catch (error) {
                        console.error('Authentication failed', error);
                        return;
                    }
                }
            }
        }
    },
    providers: [],
}
