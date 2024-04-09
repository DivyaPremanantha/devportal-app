import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(request, event) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET});
    const isAuthenticated = !!token;
    if (request.nextUrl.pathname.endsWith('/login') && isAuthenticated) {
        return NextResponse.redirect(new URL(request.nextUrl.href.split("/login")[0]));
    }

    if (process.env.DEPLOYMENT === "DEV" && !request.nextUrl.pathname.endsWith('/login')) {
        return NextResponse.next();
    }

    if (request.headers.get('referer') !== null && !request.nextUrl.pathname.endsWith('/login')) {
        var url = process.env.AWS_URL + request.headers.get('referer').split('/')[3];
        return NextResponse.redirect(new URL(url + request.nextUrl.pathname));
    }
}

export const config = {
    matcher: [
        '/:path*/login',
        '/resources/images/:path*',
        '/resources/stylesheet/:path*',
    ]
}