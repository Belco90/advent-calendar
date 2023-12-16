'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { type CompartmentTable, type Database } from '@/lib/database.types'

function getCheckboxValue(
	formData: FormData,
	fieldName: keyof CompartmentTable,
): boolean {
	return !!formData.get(fieldName)
}

export async function updateCompartment(
	id: CompartmentTable['id'],
	_: unknown,
	formData: FormData,
) {
	const supabase = createServerActionClient<Database>({ cookies })
	const isLocked = getCheckboxValue(formData, 'isLocked')
	const isOpened = getCheckboxValue(formData, 'isOpened')

	const { error } = await supabase
		.from('compartment')
		.update({ isLocked, isOpened })
		.eq('id', id)

	if (error) {
		return { errorMessage: error.message }
	}

	revalidatePath('/mm17_')
	redirect('/mm17_')
}
