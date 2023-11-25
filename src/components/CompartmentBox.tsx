'use client'

import Image from 'next/image'
import { type FC, useState } from 'react'
import { FaQuestionCircle, FaLock } from 'react-icons/fa'

import {
	type Compartment,
	type OpenCompartmentErrorBody,
	type OpenCompartmentSuccessBody,
} from '@/models'
import { css } from '@/styled-system/css'
import { panda, Box } from '@/styled-system/jsx'

const CompartmentBox: FC<{ compartment: Compartment }> = ({
	compartment: initialCompartment,
}) => {
	const [compartment, setCompartment] =
		useState<Compartment>(initialCompartment)
	const { isLocked, isOpened } = compartment
	const shouldShowPicture = !isLocked && isOpened

	const handleOpenCompartment = async () => {
		// TODO: handle loading

		try {
			const response = await fetch(`api/compartment/${compartment.id}/open`, {
				method: 'POST',
			})

			if (response.ok) {
				const { compartment: updatedCompartment } =
					(await response.json()) as OpenCompartmentSuccessBody

				// TODO: assign class for open animation
				setCompartment(updatedCompartment)
			} else {
				const { errorCode } =
					(await response.json()) as OpenCompartmentErrorBody
				// TODO: show toast
				console.log(`Error code: ${errorCode}`)
			}
		} catch (error) {
			// TODO: show toast
			console.log('error:', error)
		}
	}

	return (
		<button
			type="button"
			key={compartment.id}
			onClick={handleOpenCompartment}
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
				borderWidth="medium"
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
