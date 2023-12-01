'use client'

import { ark } from '@ark-ui/react'
import { type ComponentProps, type FC } from 'react'

import { panda } from '@/styled-system/jsx'
import { button } from '@/styled-system/recipes'

const InnerButton = panda(ark.button, button)

export type ButtonProps = ComponentProps<typeof InnerButton> & {
	isLoading?: boolean | undefined
	loadingText?: string | undefined
}

export const Button: FC<ButtonProps> = ({
	isLoading = false,
	loadingText = 'Cargando...',
	children,
	...innerProps
}) => {
	return (
		<InnerButton {...innerProps} disabled={isLoading}>
			{isLoading ? loadingText : children}
		</InnerButton>
	)
}
