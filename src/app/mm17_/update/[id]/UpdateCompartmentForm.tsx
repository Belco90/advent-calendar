'use client'

import { type FC } from 'react'
import { useFormStatus } from 'react-dom'

import { updateCompartment } from './action'

import { Button } from '@/components/Button'
import * as Checkbox from '@/components/Checkbox'
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
			<Button w="full" isLoading={pending}>
				Submit
			</Button>
		</VStack>
	)
}

const UpdateCompartmentForm: FC<{ compartment: CompartmentTable }> = ({
	compartment,
}) => {
	const updateCompartmentWithId = updateCompartment.bind(null, compartment.id)

	return (
		<form action={updateCompartmentWithId} className={css({ w: 'full' })}>
			<FormContent compartment={compartment} />
		</form>
	)
}

export default UpdateCompartmentForm
