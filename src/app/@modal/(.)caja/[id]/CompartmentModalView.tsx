'use client'

import { Portal } from '@ark-ui/react'
import { useRouter } from 'next/navigation'
import { type FC, type ReactNode } from 'react'

import { Dialog } from '@/components/Dialog'
import { Stack } from '@/styled-system/jsx'

const CompartmentModalView: FC<{ children: ReactNode }> = ({ children }) => {
	const router = useRouter()
	const handleExit = () => {
		router.back()
	}

	return (
		<Dialog.Root
			defaultOpen
			closeOnEscapeKeyDown
			closeOnInteractOutside
			onExitComplete={handleExit}
		>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner top="0" left="0">
					<Dialog.Content>
						<Stack gap="8" p="6">
							{children}
							<Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
						</Stack>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

export default CompartmentModalView
