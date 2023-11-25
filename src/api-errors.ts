export const API_ERRORS = {
	COMPARTMENT_DB_EXCEPTION: 700,
	COMPARTMENT_NOT_FOUND: 701,
	COMPARTMENT_LOCKED: 702,
	COMPARTMENT_DAY_NOT_ALLOWED: 703,
	COMPARTMENT_ALREADY_OPEN: 704,
} as const satisfies Record<string, number>
