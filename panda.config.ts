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
			keyframes: {
				'tilt-shaking': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(5deg)' },
					'50%': { transform: 'rotate(0deg)' },
					'75%': { transform: 'rotate(-5deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
			},
			tokens: {
				fonts: {
					heading: { value: 'var(--font-inter)' },
					body: { value: 'var(--font-inter)' },
					hand: { value: 'var(--font-dancing-script)' },
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
				animations: {
					'tilt-shaking': { value: 'tilt-shaking 0.75s linear infinite' },
				},
			},
		},
	},
	globalCss,
	outdir: 'styled-system',
	jsxFramework: 'react',
	jsxFactory: 'panda',
})
