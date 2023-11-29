import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import CompartmentBox from '@/app/CompartmentBox'
import { Text } from '@/components/Text'
import { type Database } from '@/lib/database.types'
import { type Compartment } from '@/models'
import { Box, Grid } from '@/styled-system/jsx'

const getCompartments = async (): Promise<Array<Compartment> | null> => {
	const cookieStore = cookies()
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	})
	const { data } = await supabase.from('compartment').select()

	if (!data) {
		return data
	}

	return data.map((compartment) => {
		if (!compartment.isOpened) {
			// Exclude fields that shouldn't be available if not opened.
			const { id, createdAt, day, isLocked } = compartment
			return { isOpened: false, id, day, isLocked, createdAt }
		}
		return compartment
	})
}

const SHUFFLED_COMPARTMENTS_DAYS = [
	14, 6, 5, 21, 16, 11, 15, 10, 18, 23, 9, 7, 22, 8, 2, 4, 3, 17, 12, 13, 24,
	20, 1, 19,
] as const

async function HomePage() {
	const compartments = await getCompartments()

	if (!compartments) {
		return <div>No data!</div>
	}

	const mockDateString = process.env.NEXT_PUBLIC_MOCK_DATE

	const shuffledCompartments = SHUFFLED_COMPARTMENTS_DAYS.map((shuffledDay) =>
		compartments.find(({ day }) => shuffledDay === day),
	) as Array<Compartment>

	return (
		<Box>
			<Text mb="4" fontWeight="medium">
				¡Hola! Este es tu Calendario de Adviento 2023.
			</Text>
			<Grid columns={3} gap={{ base: '4', md: '20' }}>
				{shuffledCompartments.map((compartment) => (
					<CompartmentBox key={compartment.id} compartment={compartment} />
				))}
			</Grid>
			{!!mockDateString && <Box mt="10">Mock date: {mockDateString}</Box>}
		</Box>
	)
}

export default HomePage
