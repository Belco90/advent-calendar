import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { IoArrowBack } from 'react-icons/io5'

import UpdateCompartmentForm from './UpdateCompartmentForm'

import { type CompartmentTable, type Database } from '@/lib/database.types'
import { getPicturePublicUrl } from '@/lib/utils'
import { css } from '@/styled-system/css'
import { Box, VStack } from '@/styled-system/jsx'

interface PageProps {
	params: { id: string }
}

const getDbCompartment = async (
	id: string,
): Promise<CompartmentTable | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const response = await supabase
		.from('compartment')
		.select()
		.eq('id', id)
		.single()

	return response.data
}

const UpdateCompartmentPage: FC<PageProps> = async ({ params }) => {
	const { id: compartmentId } = params
	const compartment = await getDbCompartment(compartmentId)

	if (!compartment) {
		return <div>Compartment not found</div>
	}

	return (
		<VStack gap="4" alignItems="start">
			<Link href="/mm17_">
				<Box
					display="inline-flex"
					alignItems="center"
					textDecoration="underline"
				>
					<IoArrowBack /> Atrás
				</Box>
			</Link>
			<Box>
				<Image
					src={getPicturePublicUrl(compartment.pictureFK)}
					alt=""
					width={compartment.pictureMeta.width}
					height={compartment.pictureMeta.height}
					className={css({
						objectFit: 'cover',
						boxShadow: 'outline',
						aspectRatio: 'square',
						rounded: 'lg',
					})}
				/>
			</Box>
			<UpdateCompartmentForm compartment={compartment} />
		</VStack>
	)
}

export default UpdateCompartmentPage
