'use client'

import { Portal } from '@ark-ui/react'
import { useRouter } from 'next/navigation'
import { type FC, type ReactNode } from 'react'
import { IoClose } from 'react-icons/io5'

import { Dialog } from '@/components/Dialog'
import { panda, Stack } from '@/styled-system/jsx'

const CloseIcon = panda(IoClose)

const CompartmentModalView: FC<{ children: ReactNode }> = ({ children }) => {
	const router = useRouter()
	const handleExit = () => {
		router.replace('/', { scroll: false })
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
						<Stack gap="8" p="6" width="full">
							{children}
							<Dialog.CloseTrigger
								asChild
								position="absolute"
								top="2"
								right="2"
							>
								<button aria-label="Close Dialog">
									<CloseIcon fontSize="2xl" />
								</button>
							</Dialog.CloseTrigger>
						</Stack>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

export default CompartmentModalView
