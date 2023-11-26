import { type CompartmentTable } from '@/lib/database.types'

export type OpenCompartment = { isOpened: true } & Omit<
	CompartmentTable,
	'isOpened'
>
export type ClosedCompartment = { isOpened: false } & Pick<
	CompartmentTable,
	'id' | 'createdAt' | 'day' | 'isLocked'
>

export type Compartment = OpenCompartment | ClosedCompartment

export interface OpenCompartmentSuccessBody {
	compartment: Compartment
}

export interface OpenCompartmentErrorBody {
	errorMessage: string
	errorCode: number
}
