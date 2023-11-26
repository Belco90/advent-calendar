import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { type Database } from '@/lib/database.types'
import { type OpenCompartment } from '@/models'
import { Container } from '@/styled-system/jsx'

const getCompartment = async (id: string): Promise<OpenCompartment | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: compartment } = await supabase
		.from('compartment')
		.select()
		.eq('id', id)
		.single()

	if (!compartment || !compartment.isOpened) {
		return null
	}

	return compartment as OpenCompartment
}

const CompartmentDetailsPage = async ({
	params,
}: {
	params: { id: string }
}) => {
	const { id: compartmentId } = params

	const compartment = await getCompartment(compartmentId)

	if (!compartment) {
		return (
			<Container maxWidth="breakpoint-md">
				Esta caja no se puede ver aún.
			</Container>
		)
	}

	return (
		<Container maxWidth="breakpoint-md">
			<h2>Caja del día {compartment.day}</h2>
			<p>{compartment.title}</p>
		</Container>
	)
}

export default CompartmentDetailsPage
