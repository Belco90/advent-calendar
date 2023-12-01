'use client'

import {
	type ComponentProps,
	createContext,
	type FC,
	type ReactNode,
	useContext,
	useState,
} from 'react'
import ReactConfetti, { type Props } from 'react-confetti'

import { useHtmlSize } from '@/hooks/useHtmlSize'

type ConfettiInstance = Parameters<
	NonNullable<ComponentProps<typeof ReactConfetti>['onConfettiComplete']>
>[0]
type ConfettiProps = Omit<Props, 'width' | 'height' | 'run'>
type ConfettiSetter = (props: ConfettiProps) => void

interface TConfettiSetterContext {
	setProps: ConfettiSetter
	setShouldRun: (newValue: boolean) => void
}

interface TConfettiValueContext {
	props: ConfettiProps | undefined
	shouldRun: boolean
}

const ConfettiValueContext = createContext<TConfettiValueContext | undefined>(
	undefined,
)
const ConfettiSetterContext = createContext<TConfettiSetterContext | undefined>(
	undefined,
)

const Confetti: FC<ConfettiProps> = () => {
	const { width, height } = useHtmlSize()
	const valueContext = useContext(ConfettiValueContext)
	const setterContext = useContext(ConfettiSetterContext)

	if (!valueContext || !setterContext) {
		throw new Error(
			'The Confetti component must be wrapped within ConfettiValueContext',
		)
	}

	const { props: confettiProps, shouldRun } = valueContext
	const { setShouldRun } = setterContext

	const {
		onConfettiComplete,
		numberOfPieces = 0,
		...props
	} = confettiProps ?? {}

	const handleConfettiComplete = (confetti: ConfettiInstance) => {
		confetti?.reset()
		setShouldRun(false)
		onConfettiComplete?.()
	}

	const finalNumberOfPieces = shouldRun ? numberOfPieces : 0

	return (
		<ReactConfetti
			run
			width={width}
			height={height}
			numberOfPieces={finalNumberOfPieces}
			onConfettiComplete={handleConfettiComplete}
			{...props}
		/>
	)
}

const GlobalConfetti: FC<{ children: ReactNode }> = ({ children }) => {
	const [confettiProps, setConfettiProps] = useState<ConfettiProps | undefined>(
		undefined,
	)
	const [shouldRun, setShouldRun] = useState(false)

	return (
		<ConfettiSetterContext.Provider
			value={{ setProps: setConfettiProps, setShouldRun }}
		>
			<ConfettiValueContext.Provider
				value={{ props: confettiProps, shouldRun }}
			>
				<Confetti />
				{children}
			</ConfettiValueContext.Provider>
		</ConfettiSetterContext.Provider>
	)
}

function useGlobalConfetti(): ConfettiSetter {
	const context = useContext(ConfettiSetterContext)

	if (!context) {
		throw new Error(
			'The useGlobalConfetti hook must be wrapped within ConfettiSetterContext',
		)
	}

	const { setProps, setShouldRun } = context

	return (props: ConfettiProps) => {
		setProps(props)
		setShouldRun(true)
	}
}

export { GlobalConfetti, useGlobalConfetti }
