import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { type FC, type ReactNode } from 'react'

import LayoutUI from './LayoutUI'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'Calendario Adviento 2023',
	description: '🎄 Calendario de Adviento 2023',
}

const RootLayout: FC<{ children: ReactNode; modal: ReactNode }> = ({
	children,
	modal,
}) => (
	<html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
		<body>
			<LayoutUI>{children}</LayoutUI>
			{modal}
		</body>
	</html>
)
export default RootLayout
