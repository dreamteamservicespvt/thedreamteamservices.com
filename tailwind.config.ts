
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '2.5rem',
				'2xl': '3rem',
			},
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		screens: {
			'xs': '475px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			// Custom breakpoints for better mobile experience
			'mobile': {'max': '639px'},
			'tablet': {'min': '640px', 'max': '1023px'},
			'desktop': {'min': '1024px'},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// DTS custom colors
				dts: {
					blue: {
						DEFAULT: '#0f172a',
						light: '#1e293b',
						dark: '#020617',
					},
					purple: {
						DEFAULT: '#7e22ce',
						light: '#a855f7',
						dark: '#6b21a8',
					},
					cyan: {
						DEFAULT: '#06b6d4',
						light: '#22d3ee',
						dark: '#0891b2',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				"pulse-slow": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" }
				},
				"gradient-x": {
					"0%, 100%": {
						"background-position": "0% 50%"
					},
					"50%": {
						"background-position": "100% 50%"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-out": "fade-out 0.5s ease-out forwards",
				"slide-in-right": "slide-in-right 0.5s ease-out forwards",
				"float": "float 3s ease-in-out infinite",
				"pulse-slow": "pulse-slow 4s ease-in-out infinite",
				"gradient-x": "gradient-x 15s ease infinite"
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to bottom right, rgba(125, 33, 206, 0.3), rgba(6, 182, 212, 0.2))',
				'card-gradient': 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.5), rgba(6, 182, 212, 0.3))',
				'footer-gradient': 'linear-gradient(to bottom, rgba(15, 23, 42, 0), rgba(15, 23, 42, 1))',
				'button-gradient': 'linear-gradient(90deg, #7e22ce, #06b6d4)',
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
				'144': '36rem',
			},
			minHeight: {
				'screen-mobile': '100vh',
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			},
			maxHeight: {
				'screen-mobile': '100vh',
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
} satisfies Config;
