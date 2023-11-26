'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { type FC, useEffect } from 'react'

import { type Database } from '@/lib/database.types'
import { LOGIN_URL } from '@/lib/utils'
import { Center, Container } from '@/styled-system/jsx'

const LogoutClientView: FC = () => {
	const supabase = createClientComponentClient<Database>()

	const { replace } = useRouter()

	useEffect(() => {
		supabase.auth
			.signOut()
			.then(() => {
				replace(LOGIN_URL)
			})
			.catch(() => {
				// TODO: show toast
				// eslint-disable-next-line no-console
				console.log('Error logging out')
			})
	}, [replace, supabase.auth])

	return (
		<Container maxWidth="breakpoint-md">
			<Center>Saliendo... 👋</Center>
		</Container>
	)
}

export default LogoutClientView
