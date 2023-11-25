module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'next/core-web-vitals',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: true,
	},
	rules: {
		// General
		'no-console': 'warn',
		'no-restricted-imports': [
			'error',
			{
				name: '@/lib/database-generated.types',
				message: 'Please import from `@/lib/database.types` instead.',
			},
		],

		// TypeScript
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/array-type': [
			'warn',
			{
				default: 'generic',
			},
		],
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-misused-promises': 'off',

		// Import
		'import/newline-after-import': 'error',
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],

		// React
		'react/self-closing-comp': 'warn',
	},

	overrides: [
		{
			files: ['*.js'],
			extends: ['plugin:@typescript-eslint/disable-type-checked'],
		},
	],
}
