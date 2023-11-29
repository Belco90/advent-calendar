'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { FaLock } from 'react-icons/fa'

import { API_ERRORS } from '@/api-errors'
import FullscreenBackdrop from '@/components/FullscreenBackdrop'
import { toast } from '@/components/Toaster'
import { getIsCompartmentDayAllowed } from '@/lib/utils'
import {
	type Compartment,
	type OpenCompartmentErrorBody,
	type OpenCompartmentSuccessBody,
} from '@/models'
import { css } from '@/styled-system/css'
import { Box, panda } from '@/styled-system/jsx'

const DEFAULT_ERROR_MESSAGE =
	'Algo salió mal 😞. Informa al administrador de esta web.'

const LockIcon = panda(FaLock)

function getErrorDisplay(code: number, compartment: Compartment) {
	const { day } = compartment
	const errorMessagesMap: Record<number, string> = {
		[API_ERRORS.COMPARTMENT_ALREADY_OPEN]: `La caja del día ${day} ya está abierta 🔑.`,
		[API_ERRORS.COMPARTMENT_DAY_NOT_ALLOWED]: `La caja del día ${day} todavía no puede abrirse 🗓️.`,
		[API_ERRORS.COMPARTMENT_LOCKED]: `La caja del día ${day} está bloqueada 🔒.`,
		[API_ERRORS.COMPARTMENT_NOT_FOUND]: `La caja del día ${day} no existe 🔎.`,
	}
	return errorMessagesMap[code] || DEFAULT_ERROR_MESSAGE
}

const CompartmentBox: FC<{ compartment: Compartment }> = ({
	compartment: initialCompartment,
}) => {
	const [compartment, setCompartment] =
		useState<Compartment>(initialCompartment)
	const [isLoading, setIsLoading] = useState(false)

	const { isLocked, isOpened } = compartment
	const wasOpened = initialCompartment.isOpened != compartment.isOpened
	const shouldShowPicture = !isLocked && isOpened
	const shouldShowCover = !shouldShowPicture || wasOpened
	const isCompartmentDayAllowed = getIsCompartmentDayAllowed(compartment.day)
	const canBeOpen = isCompartmentDayAllowed && !isOpened && !isLocked

	const handleOpenCompartment = async () => {
		setIsLoading(true)
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
				toast.create({
					title: 'Error',
					description: getErrorDisplay(errorCode, compartment),
					type: 'error',
				})
			}
		} catch (error) {
			toast.create({
				title: 'Error',
				description: DEFAULT_ERROR_MESSAGE,
				type: 'error',
			})
		} finally {
			setIsLoading(false)
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
			animation={canBeOpen ? 'tilt-shaking' : undefined}
		>
			{isLoading && <FullscreenBackdrop />}
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
							})}
						/>
					</Link>
				)}
			</Box>
		</Box>
	)
}

export default CompartmentBox
