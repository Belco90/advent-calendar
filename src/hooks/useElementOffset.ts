import { type RefObject, useEffect, useRef, useState } from 'react'

function useElementOffset(): [
	RefObject<HTMLDivElement>,
	{
		left: number
		top: number
		width: number
		height: number
	},
] {
	const boxRef = useRef<HTMLDivElement>(null)
	const [offset, setOffset] = useState({ left: 0, top: 0, height: 0, width: 0 })

	useEffect(() => {
		setOffset({
			left: boxRef.current?.offsetLeft ?? 0,
			top: boxRef.current?.offsetTop ?? 0,
			width: boxRef.current?.offsetWidth ?? 0,
			height: boxRef.current?.offsetHeight ?? 0,
		})
	}, [])

	return [boxRef, offset]
}

export { useElementOffset }
