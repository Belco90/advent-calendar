import { type FC } from 'react'

import { Text } from '@/components/Text'
import { Box, Grid } from '@/styled-system/jsx'

const PLACEHOLDER_ARRAY = Array.from(Array(24), (_, i) => i)

const LoadingPage: FC = () => {
	return (
		<Box>
			<Text mb="4" fontWeight="medium">
				¡Hola! Este es tu Calendario de Adviento 2023.
			</Text>

			<Grid columns={3} gap={{ base: '4', md: '20' }}>
				{PLACEHOLDER_ARRAY.map((arrKey) => (
					<Box
						key={arrKey}
						height="full"
						width="full"
						aspectRatio="square"
						animation="pulse"
						bgColor="green.100"
						borderRadius="2xl"
						borderColor="green.700"
						borderStyle="dashed"
						borderWidth="medium"
					/>
				))}
			</Grid>
		</Box>
	)
}

export default LoadingPage
