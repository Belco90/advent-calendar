import { defineConfig } from '@pandacss/dev'

import { globalCss } from '@/theme/global-css'
import { textStyles } from '@/theme/text-styles'

export default defineConfig({
	preflight: true,
	presets: ['@pandacss/preset-panda', '@park-ui/panda-preset'],
	include: [
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/app/**/*.{js,jsx,ts,tsx}',
	],
	exclude: [],
	strictTokens: true,
	conditions: {
		extend: {
			// Enable dark theme
			dark: '.dark &, [data-theme="dark"] &',
			light: '.light &',
		},
	},
	theme: {
		extend: {
			textStyles,
			tokens: {
				fonts: {
					heading: { value: 'var(--font-inter)' },
					body: { value: 'var(--font-inter)' },
				},
				zIndex: {
					hide: { value: -1 },
					auto: { value: 'auto' },
					base: { value: 0 },
					docked: { value: 10 },
					dropdown: { value: 1000 },
					sticky: { value: 1100 },
					banner: { value: 1200 },
					overlay: { value: 1300 },
					modal: { value: 1400 },
					popover: { value: 1500 },
					skipLink: { value: 1600 },
					toast: { value: 1700 },
					tooltip: { value: 1800 },
				},
			},
		},
	},
	globalCss,
	outdir: 'styled-system',
	jsxFramework: 'react',
	jsxFactory: 'panda',
})
