import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { getDate, getMonth } from 'date-fns'
import MockDate from 'mockdate'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { type Database } from '@/lib/database.types'

function getIsCompartmentDayAllowed(day: number): boolean {
	const mockDateString = process.env.MOCK_DATE
	if (mockDateString) {
		MockDate.set(mockDateString)
	}
	const today = new Date()

	// Months are 0-index based, so 11 is December.
	if (getMonth(today) !== 11) {
		return false
	}
	const todayDay = getDate(today)

	return day <= todayDay
}

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

	if (compartment.isLocked) {
		return NextResponse.json({ error: 'Compartment locked.' }, { status: 403 })
	}

	if (!getIsCompartmentDayAllowed(compartment.day)) {
		return NextResponse.json(
			{ error: 'Compartment day not allowed.' },
			{ status: 403 },
		)
	}

	// TODO: open the compartment

	return Response.json({ day: compartment.day })
}
