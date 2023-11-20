import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { type CompartmentTable, type Database } from '@/lib/database.types'
import { Grid } from '@/styled-system/jsx'

const getCompartments = async (): Promise<Array<CompartmentTable> | null> => {
	const cookieStore = cookies()
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	})
	const { data } = await supabase.from('compartment').select()

	return data
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
						<div>
							{compartment.title} ({compartment.happenedAt})
						</div>
						<img src={compartment.pictureFK} alt="" />
					</div>
				))}
			</Grid>
		</>
	)
}

export default HomePage
