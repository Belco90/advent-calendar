import { type FC } from 'react'

import ToggleUserAuth from '@/components/ToggleUserAuth'
import { Box, Container, Flex, panda, Spacer } from '@/styled-system/jsx'

const Header: FC = () => {
	return (
		<panda.header
			zIndex="banner"
			shadow="lg"
			width="full"
			bgColor={{ base: 'white', _dark: 'gray.700' }}
		>
			<Container py="2" maxWidth="breakpoint-md">
				<Flex width="full" align="center">
					<Box
						fontWeight="bold"
						fontSize={{ base: 'xl', md: '2xl' }}
						fontFamily="heading"
					>
						<h1>Calendario Adviento 2023</h1>
					</Box>

					<Spacer />

					<Box>
						<ToggleUserAuth />
					</Box>
				</Flex>
			</Container>
		</panda.header>
	)
}

export default Header
