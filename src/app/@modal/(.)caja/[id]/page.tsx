import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import CompartmentModalView from './CompartmentModalView'

import CompartmentCard from '@/components/CompartmentCard'
import { type Database } from '@/lib/database.types'
import { type OpenCompartment } from '@/models'
import { Box } from '@/styled-system/jsx'

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

const CompartmentModalPage = async ({ params }: { params: { id: string } }) => {
	const { id: compartmentId } = params

	const compartment = await getCompartment(compartmentId)

	if (!compartment) {
		return <Box>Esta caja no se puede ver aún.</Box>
	}

	return (
		<CompartmentModalView>
			<CompartmentCard compartment={compartment} />
		</CompartmentModalView>
	)
}

export default CompartmentModalPage
