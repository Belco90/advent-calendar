'use client'

import dynamic from 'next/dynamic'
import {
	createContext,
	type FC,
	type ReactNode,
	useContext,
	useState,
} from 'react'
import { type Props } from 'react-confetti'

import { useHtmlSize } from '@/hooks/useHtmlSize'

const ReactConfetti = dynamic(() => import('react-confetti'), {
	ssr: false,
})

type ConfettiProps = Omit<Props, 'width' | 'height'>
type ConfettiSetter = (props: ConfettiProps) => void

const ConfettiValueContext = createContext<ConfettiProps | undefined>(undefined)
const ConfettiSetterContext = createContext<ConfettiSetter | undefined>(
	undefined,
)

const Confetti: FC<ConfettiProps> = () => {
	const { width, height } = useHtmlSize()
	const confettiProps = useContext(ConfettiValueContext)

	if (!confettiProps) {
		throw new Error(
			'The Confetti component must be wrapped within ConfettiValueContext',
		)
	}

	const finalWidth = width ? width - 20 : 0
	const finalHeight = height ? height - 20 : 0

	return (
		<ReactConfetti width={finalWidth} height={finalHeight} {...confettiProps} />
	)
}

const GlobalConfetti: FC<{ children: ReactNode }> = ({ children }) => {
	const [confettiProps, setConfettiProps] = useState<ConfettiProps>({
		run: false,
	})

	return (
		<ConfettiSetterContext.Provider value={setConfettiProps}>
			<ConfettiValueContext.Provider value={confettiProps}>
				<Confetti />
				{children}
			</ConfettiValueContext.Provider>
		</ConfettiSetterContext.Provider>
	)
}

function useGlobalConfetti(): ConfettiSetter {
	const setter = useContext(ConfettiSetterContext)

	if (!setter) {
		throw new Error(
			'The useGlobalConfetti hook must be wrapped within ConfettiSetterContext',
		)
	}

	return setter
}

export { GlobalConfetti, useGlobalConfetti }
