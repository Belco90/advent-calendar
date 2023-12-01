'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from 'next/image'
import { type FC } from 'react'

import { Text } from '@/components/Text'
import { getPicturePublicUrl } from '@/lib/utils'
import { type OpenCompartment } from '@/models'
import { css } from '@/styled-system/css'
import { Box, VStack, panda } from '@/styled-system/jsx'

const CompartmentCard: FC<{ compartment: OpenCompartment }> = ({
	compartment,
}) => {
	const happenedAtFormatted = format(new Date(compartment.happenedAt), 'PPPP', {
		locale: es,
	})

	return (
		<VStack gap="2" alignItems="flex-start">
			<panda.h2 fontWeight="bold">🎁 Caja del día {compartment.day}</panda.h2>
			<Image
				src={getPicturePublicUrl(compartment.pictureFK)}
				alt=""
				width={compartment.pictureMeta.width}
				height={compartment.pictureMeta.height}
				className={css({ objectFit: 'cover', boxShadow: 'outline' })}
			/>

			<Box width="full" boxShadow="md" borderRadius="md">
				<Box
					width="full"
					bgColor="brown.dark.6"
					borderTopRadius="inherit"
					px="4"
					py="1"
					color="white"
					textAlign="right"
					fontStyle="italic"
				>
					{happenedAtFormatted}
				</Box>
				<Text
					fontFamily="hand"
					fontSize="22px"
					fontWeight="medium"
					lineHeight="32px"
					minHeight={{ base: '15vh', md: '20vh' }}
					outline={0}
					width="full"
					height="full"
					overflowY="auto"
					background="repeating-linear-gradient(#F1EDE9, #F1EDE9 31px, #94ACD4 31px, #94ACD4 32px)"
					px={4}
					py={2}
					borderBottomRadius="inherit"
				>
					{compartment.title}
				</Text>
			</Box>
		</VStack>
	)
}

export default CompartmentCard
