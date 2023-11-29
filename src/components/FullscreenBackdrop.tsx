import { Portal } from '@ark-ui/react'
import { type FC } from 'react'
import { FaSpinner } from 'react-icons/fa6'

import { Box } from '@/styled-system/jsx'

const FullscreenBackdrop: FC = () => {
	return (
		<Portal>
			<Box
				position="fixed"
				top="0"
				left="0"
				height="full"
				width="full"
				zIndex="tooltip"
				backdropFilter="brightness(50%)"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Box
					animation="spin"
					width="fit-content"
					fontSize="8xl"
					color="accent.4"
				>
					<FaSpinner />
				</Box>
			</Box>
		</Portal>
	)
}

export default FullscreenBackdrop
