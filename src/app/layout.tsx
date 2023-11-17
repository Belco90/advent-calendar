import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { type ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'Calendario Adviento 2023',
	description: '🎄 Calendario de Adviento 2023',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
			<body>{children}</body>
		</html>
	)
}
