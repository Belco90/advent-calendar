'use client'

import { type FC, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { updateCompartment } from './action'

import { Button } from '@/components/Button'
import * as Checkbox from '@/components/Checkbox'
import { toast } from '@/components/Toaster'
import { type CompartmentTable } from '@/lib/database.types'
import { css } from '@/styled-system/css'
import { VStack } from '@/styled-system/jsx'

const FormContent: FC<{ compartment: CompartmentTable }> = ({
	compartment,
}) => {
	const { pending } = useFormStatus()

	return (
		<VStack alignItems="start" gap="2">
			<Checkbox.Root
				colorPalette="green"
				defaultChecked={compartment.isLocked}
				name="isLocked"
			>
				<Checkbox.Control />
				<Checkbox.Label>Locked</Checkbox.Label>
			</Checkbox.Root>
			<Checkbox.Root
				colorPalette="green"
				defaultChecked={compartment.isOpened}
				name="isOpened"
			>
				<Checkbox.Control />
				<Checkbox.Label>Open</Checkbox.Label>
			</Checkbox.Root>
			<Button w="full" isLoading={pending}>
				Submit
			</Button>
		</VStack>
	)
}

const initialFormState: { errorMessage: null | string } = {
	errorMessage: null,
}

const UpdateCompartmentForm: FC<{ compartment: CompartmentTable }> = ({
	compartment,
}) => {
	const updateCompartmentWithId = updateCompartment.bind(null, compartment.id)
	const [formState, formAction] = useFormState(
		updateCompartmentWithId,
		initialFormState,
	)

	const { errorMessage } = formState

	useEffect(() => {
		if (errorMessage) {
			toast.error({ title: 'Error', description: errorMessage })
		}
	}, [errorMessage])

	return (
		<form action={formAction} className={css({ w: 'full' })}>
			<FormContent compartment={compartment} />
		</form>
	)
}

export default UpdateCompartmentForm
