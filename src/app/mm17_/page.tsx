import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

import { type CompartmentTable, type Database } from '@/lib/database.types'
import { getPicturePublicUrl } from '@/lib/utils'
import { css } from '@/styled-system/css'
import { Box, Grid } from '@/styled-system/jsx'

const getAdminCompartments =
	async (): Promise<Array<CompartmentTable> | null> => {
		const supabase = createServerComponentClient<Database>({ cookies })

		const { data } = await supabase
			.from('compartment')
			.select()
			.order('day', { ascending: true })

		return data
	}

const AdminIndexPage: FC = async () => {
	const compartments = await getAdminCompartments()

	if (!compartments || compartments.length === 0) {
		return <div>Compartments not found</div>
	}

	return (
		<Grid columns={3}>
			{compartments.map(({ id, pictureFK, day }) => (
				<Box key={id} aspectRatio="square" position="relative">
					<Link href={`/mm17_/update/${id}`}>
						<Image
							src={getPicturePublicUrl(pictureFK)}
							alt=""
							fill
							className={css({ objectFit: 'cover', rounded: 'lg' })}
						/>
					</Link>
					<Box
						position="absolute"
						left="2"
						top="1"
						zIndex="overlay"
						fontWeight="bold"
						fontSize="4xl"
						color="green.300"
						textShadow="md"
					>
						{day}
					</Box>
				</Box>
			))}
		</Grid>
	)
}

export default AdminIndexPage
