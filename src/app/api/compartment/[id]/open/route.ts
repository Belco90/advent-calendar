import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { getDate, getMonth } from 'date-fns'
import MockDate from 'mockdate'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { API_ERRORS } from '@/api-errors'
import { type Database } from '@/lib/database.types'
import { type Compartment } from '@/models'

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

type SuccessResponse = NextResponse<{
	compartment: Compartment
}>

type ErrorResponse = NextResponse<{
	errorMessage: string
	errorCode: number
}>

export async function POST(
	request: NextRequest,
	context: { params: { id: number } },
): Promise<SuccessResponse | ErrorResponse> {
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
		return NextResponse.json(
			{
				errorMessage: error.message,
				errorCode: API_ERRORS.COMPARTMENT_DB_EXCEPTION,
			},
			{ status: 500 },
		)
	}

	if (!compartment) {
		return NextResponse.json(
			{
				errorMessage: `Compartment with id "${id}" not found.`,
				errorCode: API_ERRORS.COMPARTMENT_NOT_FOUND,
			},
			{ status: 404 },
		)
	}

	if (compartment.isLocked) {
		return NextResponse.json(
			{
				errorMessage: 'Compartment locked.',
				errorCode: API_ERRORS.COMPARTMENT_LOCKED,
			},
			{ status: 403 },
		)
	}

	if (!getIsCompartmentDayAllowed(compartment.day)) {
		return NextResponse.json(
			{
				errorMessage: 'Compartment day not allowed.',
				errorCode: API_ERRORS.COMPARTMENT_DAY_NOT_ALLOWED,
			},
			{ status: 403 },
		)
	}

	// TODO: open the compartment

	// FIXME: send updated compartment
	return NextResponse.json({ compartment: compartment })
}
