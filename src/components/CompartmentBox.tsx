'use client'

import Image from 'next/image'
import { type FC, useState } from 'react'
import { FaQuestionCircle, FaLock } from 'react-icons/fa'

import CompartmentActionWrapper from '@/components/CompartmentActionWrapper'
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

	const wasOpened = initialCompartment.isOpened != compartment.isOpened
	const shouldShowPicture = !isLocked && isOpened
	const shouldShowCover = !shouldShowPicture || wasOpened

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
		<CompartmentActionWrapper
			key={compartment.id}
			compartment={compartment}
			onClick={handleOpenCompartment}
		>
			<Box
				display="flex"
				position="relative"
				alignItems="center"
				justifyContent="center"
				height="full"
				width="full"
				borderColor={wasOpened ? 'green.200' : 'red.200'}
				borderStyle="solid"
				borderWidth="medium"
				aspectRatio="square"
			>
				{shouldShowCover && (
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
		</CompartmentActionWrapper>
	)
}

export default CompartmentBox
