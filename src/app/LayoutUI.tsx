import { type FC, type ReactNode } from 'react'

import Header from './Header'

import { Flex, panda } from '@/styled-system/jsx'

const LayoutUI: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Flex height="full" direction="column">
			<Header />
			<panda.main flex="1" mt="6" pb="8">
				{children}
			</panda.main>
		</Flex>
	)
}

export default LayoutUI
