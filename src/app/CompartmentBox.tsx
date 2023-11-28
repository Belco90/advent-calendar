'use client'

import Image from 'next/image'
import Link from 'next/link'
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
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			height="full"
			width="full"
			borderRadius="2xl"
			shadow="sm"
			aspectRatio="square"
			transformStyle="preserve-3d"
			perspective="1000px"
		>
			<Box
				width="full"
				height="full"
				transformStyle="preserve-3d"
				perspective="1000px"
				position="relative"
			>
				{shouldShowCover && (
					<Box
						fontSize={{ base: 'xl', md: '3xl' }}
						fontWeight="bold"
						color="green.700"
						bgColor="green.200"
						borderRadius="2xl"
						borderColor="green.700"
						borderStyle="dashed"
						borderWidth="medium"
						width="full"
						height="full"
						display="flex"
						position="relative"
						zIndex="overlay"
						alignItems="center"
						justifyContent="center"
						backfaceVisibility="hidden"
						transformStyle="preserve-3d"
						transitionProperty="all"
						transitionDuration="slowest"
						visibility={wasOpened ? 'hidden' : 'initial'}
						opacity={wasOpened ? '0' : '1'}
						transition="visibility 0s 2s, opacity 2s ease-out"
					>
						<panda.button
							type="button"
							onClick={handleOpenCompartment}
							width="full"
							height="full"
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
						</panda.button>
					</Box>
				)}
				{shouldShowPicture && (
					<Link
						href={`/caja/${compartment.id}`}
						title={`Ver la caja del día ${compartment.day}`}
						scroll={false}
					>
						<Image
							src={compartment.pictureFK}
							alt=""
							fill
							className={css({
								objectFit: 'cover',
								borderRadius: '2xl',
								backfaceVisibility: 'hidden',
							})}
						/>
					</Link>
				)}
			</Box>
		</Box>
	)
}

export default CompartmentBox
