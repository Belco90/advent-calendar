import { Container } from '@/styled-system/jsx'

const CompartmentDetailsPage = ({ params }: { params: { id: string } }) => {
	const { id: compartmentId } = params
	return (
		<Container maxWidth="breakpoint-md">Caja ID: {compartmentId}</Container>
	)
}

export default CompartmentDetailsPage
