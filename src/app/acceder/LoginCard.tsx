'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { type FormEvent, type FC, useState } from 'react'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { toast } from '@/components/Toaster'
import { type Database } from '@/lib/database.types'
import { VStack } from '@/styled-system/jsx'

const LoginCard: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const formData = new FormData(event.currentTarget)
			const email = (formData.get('email') ?? '') as string
			const password = (formData.get('password') ?? '') as string

			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) {
				setIsLoading(false)
				toast.create({
					title: 'Error',
					description: error.message,
					type: 'error',
				})
			}
			router.refresh()
		} catch (err) {
			setIsLoading(false)
			toast.create({
				title: 'Error',
				description: 'Algo salió mal',
				type: 'error',
			})
		}
	}
	return (
		<Card.Root width="sm">
			<Card.Header>
				<Card.Title>Iniciar sesión</Card.Title>
			</Card.Header>
			<Card.Body>
				<form autoComplete="on" id="login-form" onSubmit={handleSubmitForm}>
					<VStack gap="4" width="full" alignItems="flex-start">
						<VStack gap="1.5" width="full" alignItems="flex-start">
							<Label>Dirección de email</Label>
							<Input id="email" name="email" type="email" required />
						</VStack>
						<VStack gap="1.5" width="full" alignItems="flex-start">
							<Label>Contraseña</Label>
							<Input id="password" name="password" type="password" required />
						</VStack>
					</VStack>
				</form>
			</Card.Body>
			<Card.Footer gap="3">
				<Button
					colorPalette="green"
					type="submit"
					form="login-form"
					isLoading={isLoading}
				>
					Continuar
				</Button>
			</Card.Footer>
		</Card.Root>
	)
}

export default LoginCard
