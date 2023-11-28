'use client'

import {
	createClientComponentClient,
	type User,
} from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { IoPowerSharp } from 'react-icons/io5'

import { type Database } from '@/lib/database.types'
import { Box } from '@/styled-system/jsx'

const LogoutButton: FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	useEffect(() => {
		const getData = async () => {
			const { data } = await supabase.auth.getUser()
			setUser(data.user)
			setIsLoading(false)
		}
		void getData()
	}, [supabase.auth])

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user || null)
		})

		return subscription.unsubscribe
	}, [router, supabase.auth])

	if (isLoading || !user) {
		return null
	}

	return (
		<Box fontSize="xl">
			<Link href="/salir" title="Cerrar sesión">
				<IoPowerSharp />
			</Link>
		</Box>
	)
}

export default LogoutButton
