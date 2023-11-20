import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { type Database } from '@/lib/database.types'
import { type Compartment } from '@/models'
import { Grid } from '@/styled-system/jsx'

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
		if (!compartment.openedAt) {
			// Exclude fields that shouldn't be available if not opened.
			const { id, createdAt, day, isLocked } = compartment
			return { openedAt: null, id, day, isLocked, createdAt }
		}
		return compartment
	})
}

async function HomePage() {
	const compartments = await getCompartments()

	if (!compartments) {
		return <div>No data!</div>
	}

	return (
		<>
			<h1>Compartments</h1>
			<Grid columns={3} gap="2">
				{compartments.map((compartment) => (
					<div key={compartment.id}>
						<div>{compartment.day}</div>
						<code>{JSON.stringify(compartment, null, 2)}</code>
					</div>
				))}
			</Grid>
		</>
	)
}

export default HomePage
