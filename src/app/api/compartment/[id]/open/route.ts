import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { type Database } from '@/lib/database.types'

export async function POST(
	request: NextRequest,
	context: { params: { id: number } },
) {
	const { id } = context.params
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	})
	const { data: compartment, error } = await supabase
		.from('compartment')
		.select()
		.eq('id', id)
		.single()

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	if (!compartment) {
		return NextResponse.json(
			{ error: `Compartment with id "${id}" not found.` },
			{ status: 404 },
		)
	}

	// TODO: check if the day is allowed to be opened
	// TODO: open the compartment

	return Response.json({ day: compartment.day })
}
