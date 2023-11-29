'use client'

import { panda, type HTMLPandaProps } from '@/styled-system/jsx'

type As = 'p' | 'span' | 'div' | 'label'

export type TextProps = {
	as?: As
} & HTMLPandaProps<As>

export const Text = (props: TextProps) => {
	const { as = 'p', ...rest } = props
	const Component = panda(as)

	return <Component {...rest} />
}
