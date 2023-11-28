'use client'

import Image from 'next/image'
import { type FC, useState } from 'react'
import { FaLock } from 'react-icons/fa'

import {
	type Compartment,
	type OpenCompartmentErrorBody,
	type OpenCompartmentSuccessBody,
} from '@/models'
import { css } from '@/styled-system/css'
import { Box, panda } from '@/styled-system/jsx'

const LockIcon = panda(FaLock)

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
		<button
			key={compartment.id}
			// compartment={compartment}
			onClick={handleOpenCompartment}
		>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="full"
				width="full"
				borderColor="green.700"
				borderStyle={isOpened ? 'none' : 'dashed'}
				borderWidth={isOpened ? 'thin' : 'medium'}
				borderRadius="2xl"
				shadow="sm"
				aspectRatio="square"
				transformStyle="preserve-3d"
				// @ts-expect-error Pending to be moved to semantic token
				perspective="1000px"
			>
				<Box
					// .door
					width="full"
					height="full"
					transformStyle="preserve-3d"
					transitionProperty="all"
					transitionDuration="slowest"
					position="relative"
					transitionDelay="slower"
					// @ts-expect-error Pending to be moved to semantic token
					transform={wasOpened ? 'rotateY(180deg)' : 'none'}
				>
					{shouldShowCover && (
						<Box
							// .door .front
							fontSize={{ base: 'xl', md: '3xl' }}
							fontWeight="bold"
							color="green.700"
							bgColor="green.200"
							borderRadius="2xl"
							width="full"
							height="full"
							display="flex"
							alignItems="center"
							justifyContent="center"
							transformStyle="preserve-3d"
							transitionProperty="all"
							transitionDuration="slow"
							backfaceVisibility="hidden"
						>
							<Box>{compartment.day}</Box>
							{isLocked && (
								<LockIcon
									fontSize="2xl"
									position="absolute"
									right="1.5"
									bottom="1.5"
								/>
							)}
						</Box>
					)}
					{shouldShowPicture && (
						<Image
							// .door .back
							src={compartment.pictureFK}
							alt=""
							fill
							className={css({
								objectFit: 'cover',
								borderRadius: '2xl',
								backfaceVisibility: 'hidden',
								// @ts-expect-error Pending to be moved to semantic token
								transform: wasOpened ? 'rotateY(180deg)' : 'none',
							})}
						/>
					)}
				</Box>
			</Box>
		</button>
	)
}

export default CompartmentBox
