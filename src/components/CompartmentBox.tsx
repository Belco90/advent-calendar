'use client'

import Image from 'next/image'
import { type FC } from 'react'
import { FaQuestionCircle, FaLock } from 'react-icons/fa'

import { type Compartment } from '@/models'
import { css } from '@/styled-system/css'
import { panda, Box } from '@/styled-system/jsx'

const CompartmentBox: FC<{ compartment: Compartment }> = ({ compartment }) => {
	const isLocked = compartment.isLocked
	const isOpened = !!compartment.openedAt
	const shouldShowPicture = !isLocked && isOpened

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
				position="relative"
				alignItems="center"
				justifyContent="center"
				height="full"
				width="full"
				borderColor="red.200"
				borderStyle="solid"
				borderWidth="2px"
				aspectRatio="square"
			>
				{!shouldShowPicture && (
					<Box fontSize="3xl">
						{isLocked ? <FaLock /> : <FaQuestionCircle />}
					</Box>
				)}
				{shouldShowPicture && (
					<Image
						src={compartment.pictureFK}
						alt=""
						fill
						className={css({ objectFit: 'cover' })}
					/>
				)}
				<Box position="absolute" bottom="0" right="1">
					<panda.span
						fontSize={{ base: 'xl', md: '3xl' }}
						fontWeight="bold"
						color="green.500"
						textStyle="box-number"
						shadowColor="blue.500"
					>
						{compartment.day}
					</panda.span>
				</Box>
			</Box>
		</button>
	)
}

export default CompartmentBox
