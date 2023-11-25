export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Array<Json>

export interface Database {
	public: {
		Tables: {
			compartment: {
				Row: {
					createdAt: string
					day: number
					happenedAt: string
					id: number
					isLocked: boolean
					isOpened: boolean
					pictureFK: string
					pictureMeta: Json
					title: string
				}
				Insert: {
					createdAt?: string
					day: number
					happenedAt: string
					id?: number
					isLocked?: boolean
					isOpened?: boolean
					pictureFK: string
					pictureMeta: Json
					title: string
				}
				Update: {
					createdAt?: string
					day?: number
					happenedAt?: string
					id?: number
					isLocked?: boolean
					isOpened?: boolean
					pictureFK?: string
					pictureMeta?: Json
					title?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
