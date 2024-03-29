import { type PostgrestError } from '@supabase/supabase-js'
import { type MergeDeep } from 'type-fest'

import { type Database as GeneratedDatabase } from './database-generated.types'

export { type Json } from './database-generated.types'

export type Database = MergeDeep<
	GeneratedDatabase,
	{
		public: {
			Tables: {
				compartment: { Row: { pictureMeta: { width: number; height: number } } }
			}
		}
	}
>

export type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row']
export type CompartmentTable = Tables<'compartment'>

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
	? Exclude<U, null>
	: never
export type DbResultErr = PostgrestError
