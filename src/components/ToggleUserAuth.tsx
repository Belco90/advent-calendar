'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { type Database } from '@/lib/database.types'

const ToggleUserAuth = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(false)
	const supabase = createClientComponentClient<Database>()

	useEffect(() => {
		const getData = async () => {
			const { data } = await supabase.auth.getSession()

			if (data.session?.user) {
				setIsAuth(true)
			}

			setIsLoading(false)
		}
		void getData()
	}, [supabase.auth])

	if (isLoading) {
		return null
	}

	return (
		<Link href={isAuth ? '/salir' : '/acceder'}>
			{isAuth ? 'Salir' : 'Acceder'}
		</Link>
	)
}

export default ToggleUserAuth
