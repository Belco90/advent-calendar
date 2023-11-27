import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

import CompartmentCard from '@/app/CompartmentCard'
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

const CompartmentDetailsPage = async ({
	params,
}: {
	params: { id: string }
}) => {
	const { id: compartmentId } = params

	const compartment = await getCompartment(compartmentId)

	if (!compartment) {
		return <Box>Esta caja no se puede ver aún.</Box>
	}

	return (
		<Box>
			<Link href="/">
				<Box
					display="inline-flex"
					alignItems="center"
					mb="4"
					_hover={{ textDecoration: 'underline' }}
				>
					<IoArrowBack /> Atrás
				</Box>
			</Link>
			<CompartmentCard compartment={compartment} />
		</Box>
	)
}

export default CompartmentDetailsPage
