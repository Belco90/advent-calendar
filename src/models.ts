import { type CompartmentTable } from '@/lib/database.types'

type OpenCompartment = { isOpened: true } & Omit<CompartmentTable, 'isOpened'>
type ClosedCompartment = { isOpened: false } & Pick<
	CompartmentTable,
	'id' | 'createdAt' | 'day' | 'isLocked'
>

export type Compartment = OpenCompartment | ClosedCompartment
