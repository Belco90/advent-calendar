import { type FC } from 'react'

import { Box, Grid } from '@/styled-system/jsx'

const PLACEHOLDER_ARRAY = Array.from(Array(24), (_, i) => i)

const LoadingPage: FC = () => {
	return (
		<Box>
			<Grid columns={3} gap={{ base: '4', md: '20' }}>
				{PLACEHOLDER_ARRAY.map((arrKey) => (
					<Box
						key={arrKey}
						height="full"
						width="full"
						aspectRatio="square"
						animation="pulse"
						bgColor="green.200"
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
