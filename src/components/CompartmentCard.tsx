import { type FC } from 'react'

import { type OpenCompartment } from '@/models'
import { Box } from '@/styled-system/jsx'

const CompartmentCard: FC<{ compartment: OpenCompartment }> = ({
	compartment,
}) => (
	<Box>
		<h2>Caja del día {compartment.day}</h2>
		<p>{compartment.title}</p>
	</Box>
)

export default CompartmentCard
