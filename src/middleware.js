import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(request, event) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET});
    const isAuthenticated = !!token;
    if (request.nextUrl.pathname.endsWith('/login') && isAuthenticated) {
        return NextResponse.redirect(new URL(request.nextUrl.href.split("/login")[0]));
    }
}

export const config = {
    matcher: [
        '/:path*/login',
    ]
}