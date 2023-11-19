'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'

import type { Database } from '@/lib/database.types'

const LoginClientView: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password,
		})
		router.push('/')
	}

	return (
		<>
			<input
				name="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type="password"
				name="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<button onClick={handleSignIn}>Sign in</button>
		</>
	)
}

export default LoginClientView
