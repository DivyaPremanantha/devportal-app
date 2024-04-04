import { NextResponse } from 'next/server'

export async function middleware(request) {
    if (process.env.DEPLOYMENT === "DEV") {
        return NextResponse.next();
    }

    if (request.headers.get('referer') !== null) {
        var url = process.env.AWS_URL + request.headers.get('referer').split('/')[3];
        return NextResponse.redirect(new URL(url + request.nextUrl.pathname));
    }
}

export const config = {
    matcher: [
        '/resources/images/:path*',
        '/resources/stylesheet/:path*',
    ]
}