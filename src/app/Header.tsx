import Link from 'next/link'
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
						<Link href="/">
							<panda.h1 _hover={{ textDecoration: 'underline' }}>
								Calendario Adviento 2023
							</panda.h1>
						</Link>
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
