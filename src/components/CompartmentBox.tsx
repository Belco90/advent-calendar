'use client'

import { type FC } from 'react'

import { type Compartment } from '@/models'
import { css } from '@/styled-system/css'
import { Box } from '@/styled-system/jsx'

const CompartmentBox: FC<{ compartment: Compartment }> = ({ compartment }) => {
	return (
		<button
			type="button"
			key={compartment.id}
			onClick={() => alert(`Compartment from day ${compartment.day}`)}
			className={css({
				'&:nth-child(1n)': { rotate: '-5deg' },
				'&:nth-child(2n)': { rotate: '12deg' },
				'&:nth-child(3n)': { rotate: '-8deg' },
				'&:nth-child(4n)': { rotate: '7deg' },
			})}
		>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="full"
				width="full"
				borderColor="red.200"
				borderStyle="solid"
				borderWidth="2px"
				aspectRatio="square"
			>
				<Box fontSize="2xl" fontWeight="bold">
					{compartment.day}
				</Box>
			</Box>
		</button>
	)
}

export default CompartmentBox
