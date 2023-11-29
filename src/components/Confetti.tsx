import { type FC } from 'react'
import ReactConfetti, { type Props } from 'react-confetti'

const Confetti: FC<Props> = (props) => {
	return <ReactConfetti {...props} />
}

export default Confetti
