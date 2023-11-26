'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthCard, SignIn } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { type ComponentProps, type FC, useEffect } from 'react'

import type { Database } from '@/lib/database.types'
import { Center } from '@/styled-system/jsx'

const localizationEs: NonNullable<
	ComponentProps<typeof SignIn>['localization']
>['variables'] = {
	sign_in: {
		button_label: 'Acceder',
		email_label: 'Dirección de email',
		loading_button_label: 'Cargando...',
		password_label: 'Contraseña',
		email_input_placeholder: '',
		password_input_placeholder: '',
	},
}

const LoginClientView: FC = () => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			if (session) {
				router.replace('/')
			}
		})

		return subscription.unsubscribe
	}, [router, supabase.auth])

	return (
		<Center>
			<AuthCard>
				<SignIn
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={[]}
					localization={{ variables: localizationEs }}
				/>
			</AuthCard>
		</Center>
	)
}

export default LoginClientView
