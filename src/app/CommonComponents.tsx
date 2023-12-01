import { type FC, type ReactNode } from 'react'

import { Text } from '@/components/Text'
import { Grid } from '@/styled-system/jsx'

export const IntroMessage: FC = () => {
	return (
		<Text mb="4" fontWeight="medium">
			¡Hola, Marta! Este es tu Calendario de Adviento 2023, hecho por Mario 🧡.
		</Text>
	)
}

export const CompartmentsGrid: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Grid columns={3} gap={{ base: '4', md: '20' }}>
			{children}
		</Grid>
	)
}
