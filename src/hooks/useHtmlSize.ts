import { useLayoutEffect, useState } from 'react'

export function useHtmlSize() {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	})

	useLayoutEffect(() => {
		const handleResize = () => {
			const htmlElement = document.querySelector('html')

			if (!htmlElement) {
				return
			}

			setSize({
				width: htmlElement.offsetWidth,
				height: htmlElement.offsetHeight,
			})
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return size
}
