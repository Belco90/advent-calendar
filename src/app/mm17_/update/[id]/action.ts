'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { type CompartmentTable, type Database } from '@/lib/database.types'

export async function updateCompartment(
	id: CompartmentTable['id'],
	_: unknown,
	formData: FormData,
) {
	const supabase = createServerActionClient<Database>({ cookies })
	const isLocked = !!formData.get('isLocked')

	const { error } = await supabase
		.from('compartment')
		.update({ isLocked })
		.eq('id', id)

	if (error) {
		return { errorMessage: error.message }
	}

	revalidatePath('/mm17_')
	redirect('/mm17_')
}
