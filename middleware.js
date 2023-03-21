import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log('req', req)
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false,
    })
    console.log({
        token
    })

    if (req.nextUrl.pathname.startsWith("/auth") && token) {
        return NextResponse.redirect(new URL("/"),req.url)
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth',
        '/auth/:path*',
        '/home/:path*'
    ]
}