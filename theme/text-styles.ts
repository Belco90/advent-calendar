import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
	'box-number': {
		value: {
			// @ts-expect-error: idk why this throws an error in TS, should be valid here
			textShadow:
				'-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
		},
	},
})
