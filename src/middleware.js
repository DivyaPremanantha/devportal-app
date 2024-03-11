import { NextResponse } from 'next/server'

export async function middleware(request) {
    if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
        return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_HOST + request.nextUrl.pathname));
    }

    if (request.headers.get('referer') !== null) {
        var url = process.env.NEXT_PUBLIC_HOST + request.headers.get('referer').split('/')[3];
        return NextResponse.redirect(new URL(url + request.nextUrl.pathname));
    }
}

export const config = {
    matcher: [
        '/resources/images/:path*',
    ]
}