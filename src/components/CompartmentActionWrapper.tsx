'use client'

import Link from 'next/link'
import { type FC, type ReactNode } from 'react'

import { type Compartment } from '@/models'

interface CompartmentActionWrapperProps {
	children: ReactNode
	compartment: Compartment
	onClick: () => void
}
const CompartmentActionWrapper: FC<CompartmentActionWrapperProps> = ({
	children,
	compartment,
	onClick,
}) => {
	if (compartment.isOpened) {
		return (
			<Link
				href={`/caja/${compartment.id}`}
				title={`Ver la caja del día ${compartment.day}`}
			>
				{children}
			</Link>
		)
	}

	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	)
}

export default CompartmentActionWrapper
