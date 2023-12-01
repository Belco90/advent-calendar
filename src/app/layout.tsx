import { type Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import { type FC, type ReactNode } from 'react'

import LayoutUI from './LayoutUI'

import { GlobalConfetti } from '@/components/GlobalConfetti'
import { Toaster } from '@/components/Toaster'

const interFont = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dancingScriptFont = Dancing_Script({
	subsets: ['latin'],
	variable: '--font-dancing-script',
})

export const metadata: Metadata = {
	title: 'Calendario Adviento 2023',
	description: '🎄 Calendario de Adviento 2023',
}

const RootLayout: FC<{ children: ReactNode; modal: ReactNode }> = ({
	children,
	modal,
}) => (
	<html
		lang="es"
		className={`${interFont.variable} ${dancingScriptFont.variable}`}
		suppressHydrationWarning
	>
		<body suppressHydrationWarning>
			<GlobalConfetti>
				<LayoutUI>{children}</LayoutUI>
			</GlobalConfetti>
			<Toaster />
			{modal}
		</body>
	</html>
)
export default RootLayout
