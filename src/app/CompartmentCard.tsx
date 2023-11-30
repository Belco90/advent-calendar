'use client'

import Image from 'next/image'
import { type FC } from 'react'

import { getPicturePublicUrl } from '@/lib/utils'
import { type OpenCompartment } from '@/models'
import { css } from '@/styled-system/css'
import { Box, VStack } from '@/styled-system/jsx'

const CompartmentCard: FC<{ compartment: OpenCompartment }> = ({
	compartment,
}) => (
	<VStack gap="2" alignItems="flex-start">
		<h2>🎁 Caja del día {compartment.day}</h2>
		<Image
			src={getPicturePublicUrl(compartment.pictureFK)}
			alt=""
			width={compartment.pictureMeta.width}
			height={compartment.pictureMeta.height}
			className={css({ objectFit: 'cover' })}
		/>
		<Box>{compartment.title}</Box>
	</VStack>
)

export default CompartmentCard
