'use client'

import dynamic from 'next/dynamic'
import {
	createContext,
	type FC,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { type Props } from 'react-confetti'

import { useHtmlSize } from '@/hooks/useHtmlSize'
import { usePrevious } from '@/hooks/usePrevious'

const ReactConfetti = dynamic(() => import('react-confetti'), {
	ssr: false,
})

type ConfettiProps = Omit<Props, 'width' | 'height' | 'run'>
type ConfettiSetter = (props: ConfettiProps) => void

const ConfettiValueContext = createContext<ConfettiProps | undefined>(undefined)
const ConfettiSetterContext = createContext<ConfettiSetter | undefined>(
	undefined,
)

const areEqualObjects = (a: unknown, b: unknown): boolean => {
	if (a === b) return true

	if (typeof a != 'object' || typeof b != 'object' || a == null || b == null)
		return false

	const keysA = Object.keys(a),
		keysB = Object.keys(b)

	if (keysA.length != keysB.length) return false

	for (const key of keysA) {
		if (!keysB.includes(key)) return false

		// @ts-expect-error Not needed to type
		if (typeof a[key] === 'function' || typeof b[key] === 'function') {
			// @ts-expect-error Not needed to type
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
			if (a[key].toString() != b[key].toString()) return false
		} else {
			// @ts-expect-error Not needed to type
			if (!areEqualObjects(a[key], b[key])) return false
		}
	}

	return true
}

const Confetti: FC<ConfettiProps> = () => {
	const { width, height } = useHtmlSize()
	const confettiProps = useContext(ConfettiValueContext)
	const [shouldRun, setShouldRun] = useState(false)
	const previousConfettiProps = usePrevious(confettiProps)

	useEffect(() => {
		if (
			!confettiProps ||
			areEqualObjects(confettiProps, previousConfettiProps)
		) {
			return
		}

		setShouldRun(true)
	}, [confettiProps, previousConfettiProps])

	const { onConfettiComplete, ...props } = confettiProps ?? {}

	const handleConfettiComplete = () => {
		setShouldRun(false)
		onConfettiComplete?.()
	}

	if (!shouldRun) {
		return null
	}

	return (
		<ReactConfetti
			run
			width={width}
			height={height}
			onConfettiComplete={handleConfettiComplete}
			{...props}
		/>
	)
}

const GlobalConfetti: FC<{ children: ReactNode }> = ({ children }) => {
	const [confettiProps, setConfettiProps] = useState<ConfettiProps | undefined>(
		undefined,
	)

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
