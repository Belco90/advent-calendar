'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { type Database } from '@/lib/database.types'

export async function updateCompartment(id: string, formData: FormData) {
	const supabase = createServerActionClient<Database>({ cookies })
	const isLockedFormValue = formData.get('isLocked')
	const isLocked = !!isLockedFormValue

	const { error } = await supabase
		.from('compartment')
		.update({ isLocked })
		.eq('id', id)

	if (error) {
		throw error
	}

	revalidatePath('/mm17_')
	redirect('/mm17_')
}
