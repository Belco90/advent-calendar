import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import type { Database } from '@/lib/database.types'

const LOGIN_URL = '/acceso' as const

/** https://supabase.com/docs/guides/auth/auth-helpers/nextjs?language=ts#managing-session-with-middleware */
export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient<Database>({ req, res })
	const { data } = await supabase.auth.getSession()

	const isUserAuth = !!data.session
	const isLoginUrl = req.nextUrl.pathname === LOGIN_URL

	if (isUserAuth) {
		if (isLoginUrl) {
			return NextResponse.redirect(new URL('/', req.url))
		}
		return res
	}

	if (!isLoginUrl) {
		return NextResponse.redirect(new URL(LOGIN_URL, req.url))
	}

	return res
}
