'use client'

import { createToaster } from '@ark-ui/react'
import { IoClose } from 'react-icons/io5'

import { Toast } from './Toast'

const [Toaster, toast] = createToaster({
	placement: 'bottom',
	duration: 5000,
	removeDelay: 250,
	render({ title, description }) {
		return (
			<Toast.Root>
				<Toast.Title>{title}</Toast.Title>
				<Toast.Description>{description}</Toast.Description>
				<Toast.CloseTrigger>
					<IoClose />
				</Toast.CloseTrigger>
			</Toast.Root>
		)
	},
})

export { Toaster, toast }
