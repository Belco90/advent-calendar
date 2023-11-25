import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import CompartmentBox from '@/components/CompartmentBox'
import { type Database } from '@/lib/database.types'
import { type Compartment } from '@/models'
import { Container, Grid } from '@/styled-system/jsx'

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

	const shuffledCompartments = SHUFFLED_COMPARTMENTS_DAYS.map((shuffledDay) =>
		compartments.find(({ day }) => shuffledDay === day),
	) as Array<Compartment>

	return (
		<Container py="8" maxWidth="breakpoint-md">
			<Grid columns={3} gap="10">
				{shuffledCompartments.map((compartment) => (
					<CompartmentBox key={compartment.id} compartment={compartment} />
				))}
			</Grid>
		</Container>
	)
}

export default HomePage
