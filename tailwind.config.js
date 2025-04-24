/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0D9488',
					light: '#14B8A6',
					dark: '#0F766E',
				},
				secondary: {
					DEFAULT: '#D14343',
					light: '#EF4444',
					dark: '#B91C1C',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					500: '#6B7280',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				},
				success: '#96E6B3',
				warning: '#FFD93D',
				error: '#FF6B6B',
				info: '#A5D8FF',
			},
			fontFamily: {
				sans: ['Plus Jakarta Sans', 'sans-serif'],
			},
			fontSize: {
				'display': ['3rem', { lineHeight: '1.2' }],
				'h1': ['2rem', { lineHeight: '1.3' }],
				'h2': ['1.5rem', { lineHeight: '1.4' }],
				'h3': ['1.25rem', { lineHeight: '1.5' }],
				'body': ['1rem', { lineHeight: '1.6' }],
				'small': ['0.875rem', { lineHeight: '1.5' }],
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float 5s ease-in-out infinite',
				'float-slower': 'float 7s ease-in-out infinite'
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
}

