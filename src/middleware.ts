import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import type { Database } from '@/lib/database.types'
import { getIsAdminUser } from '@/lib/supabase-server'
import { LOGIN_URL } from '@/lib/utils'

const ADMIN_PREFIX = '/mm17_' as const

/** https://supabase.com/docs/guides/auth/auth-helpers/nextjs?language=ts#managing-session-with-middleware */
export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient<Database>({ req, res })
	const { data } = await supabase.auth.getUser()

	const isUserAuth = !!data.user
	const nextUrl = req.nextUrl.pathname
	const isLoginUrl = nextUrl === LOGIN_URL
	const isAdminUrl = nextUrl.startsWith(ADMIN_PREFIX)

	if (nextUrl.endsWith('.map')) {
		return res
	}

	if (isUserAuth && isLoginUrl) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	if (!isUserAuth && !isLoginUrl) {
		return NextResponse.redirect(new URL(LOGIN_URL, req.url))
	}

	if (isAdminUrl && (!isUserAuth || !getIsAdminUser(data.user))) {
		notFound()
	}

	return res
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
