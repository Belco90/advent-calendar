import { defineConfig } from '@pandacss/dev'

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: [
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/app/**/*.{js,jsx,ts,tsx}',
	],

	// Files to exclude
	exclude: [],

	strictTokens: true,
	conditions: {
		extend: {
			// Enable dark theme
			dark: '.dark &, [data-theme="dark"] &',
			light: '.light &',
		},
	},

	// Useful for theme customization
	theme: {
		extend: {
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

	// The output directory for your css system
	outdir: 'styled-system',

	jsxFramework: 'react',
	jsxFactory: 'panda',
})
