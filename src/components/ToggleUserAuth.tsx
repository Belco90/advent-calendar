'use client'

import {
	createClientComponentClient,
	type User,
} from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { type Database } from '@/lib/database.types'

const ToggleUserAuth = () => {
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

	if (isLoading) {
		return null
	}

	const isAuth = !!user

	return (
		<Link href={isAuth ? '/salir' : '/acceder'}>
			{isAuth ? 'Salir' : 'Acceder'}
		</Link>
	)
}

export default ToggleUserAuth
