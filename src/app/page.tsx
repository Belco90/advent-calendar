import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { type Database } from '@/lib/database.types'
import { Grid } from '@/styled-system/jsx'

async function HomePage() {
	const cookieStore = cookies()
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	})
	const { data: compartments } = await supabase.from('compartment').select()

	return (
		<main>
			<h1>Compartments</h1>
			<Grid columns={3} gap="2">
				{compartments?.map((compartment) => (
					<div key={compartment.id}>
						<div>{compartment.title}</div>
						<img src={compartment.pictureFK} alt="" />
					</div>
				))}
			</Grid>
		</main>
	)
}

export default HomePage
