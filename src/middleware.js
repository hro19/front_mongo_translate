import { NextRequest, NextResponse } from 'next/server'

/*
matcher : middleware.jsを適用する（呼び出す）パスを指定する
*/
export const config = {
  //matcher: ['/:path*', '/tasks/:path*'],
  matcher: ['/tasks/:path*'],
};

export function middleware(req) {
    const basicAuth = req.headers.get('authorization')
    const url = req.nextUrl

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
	const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === "test" && pwd === "test") {
            return NextResponse.next()
        }
    }
    url.pathname = '/api/auth'

    return NextResponse.rewrite(url)
}