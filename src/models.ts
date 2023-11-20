import { type CompartmentTable } from '@/lib/database.types'

type OpenCompartment = { openedAt: string } & Omit<CompartmentTable, 'openedAt'>
type ClosedCompartment = { openedAt?: null } & Pick<
	CompartmentTable,
	'id' | 'createdAt' | 'day' | 'isLocked'
>

export type Compartment = OpenCompartment | ClosedCompartment
