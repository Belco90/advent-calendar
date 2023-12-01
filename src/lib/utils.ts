import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getDate, getMonth } from 'date-fns'
import MockDate from 'mockdate'

import { type Database } from '@/lib/database.types'

export const LOGIN_URL = '/acceder' as const

export function getIsCompartmentDayAllowed(day: number): boolean {
	const mockDateValue = process.env.NEXT_PUBLIC_MOCK_DATE
	if (mockDateValue) {
		MockDate.set(mockDateValue)
	}
	const today = new Date()

	// Months are 0-index based, so 11 is December.
	if (getMonth(today) !== 11) {
		return false
	}
	const todayDay = getDate(today)

	if (mockDateValue) {
		MockDate.reset()
	}

	return day <= todayDay
}

export function getPicturePublicUrl(filePath: string): string {
	if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('127.0.0.1')) {
		return filePath
	}

	const supabase = createClientComponentClient<Database>()
	const { data } = supabase.storage.from('picture').getPublicUrl(filePath)
	return data.publicUrl
}
