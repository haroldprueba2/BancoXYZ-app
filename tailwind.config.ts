/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./App.tsx',
		'./src/app/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/context/**/*.{js,jsx,ts,tsx}',
		'./src/modules/**/*.{js,jsx,ts,tsx}',
		'./src/screens/**/*.{js,jsx,ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				background: 'var(--background)',
				card: 'var(--card)',
				foreground: 'var(--foreground)',
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				'destructive-focused': 'var(--destructive-focused)',
				'destructive-focused-background':
					'var(--destructive-focused-background)'
			}
		}
	},
	future: {
		hoverOnlyWhenSupported: true
	},
	plugins: [require('tailwindcss-animate')]
};
