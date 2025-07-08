import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/lib/components/shadcn/**/*.{html,js,svelte,ts}"],
	safelist: [
		'dark', 'p-1', 'w-full', 'my-4', 'h-px', 'bg-border', 'rounded-sm', 'w-[10px]', 'h-[10px]', 
		'p-2', 'p-3', 'p-5', 'pl-16', 'pl-4', 'pt-6', 'pb-4', 'pr-1', 'pl-1', 'pl-2', 'pt-8', 'pl-6', 'pb-1',
		'ring-2', 'ring-gray-300', 'w-[12px]', 'h-[12px]',
		'rounded-full', 'font-bold', 'stroke-3', 'stroke-4',
		'object-cover', 'text-lg', 'text-base',
		'ml-1', 'ml-2', 'text-sm', 'my-4', 'rounded', 'rounded-md',
		'flex', 'justify-between', 'items-center', 'gap-2', 'gap-4',
		'ml-auto', 'max-w-[350px]', 'max-w-[450px]', 'truncate', 'text-muted-foreground',
		'grid', 'grid-cols-[140px_1fr]', 'gap-2', 'items-center',
		'w-fit', 'max-w-md', 'px-6', 'py-4', 'rounded-xl', 'shadow-md', 'border', 'border-zinc-200', 'dark:border-zinc-800',
		'flex', 'h-16', 'shrink-0', 'items-center', 'gap-2', 'border-b', 'px-4', '-ml-1', 
		'flex-1', 'flex-col', 'gap-4', 'p-4', 'auto-rows-min', 'gap-4', 'md:grid-cols-3',
		'bg-muted/50', 'aspect-video', 'rounded-xl', 'py-0',
		'min-h-[100vh]', 'flex-1', 'rounded-xl', 'md:min-h-min',
		'tracking-wide', 'uppercase', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'animate-spin',
		'justify-start', 'underline',
		'w-4', 'w-5', 'w-full', 'text-green-600', 'text-red-600', 'pt-2', 'pb-0', 'max-w-lg',
		'transition-transform', 'duration-300', 'rotate-90', 'rotate-[360deg]', 'duration-2000',
		'stroke-red-500', 'stroke-green-600', 'h-[15px]', 'w-[15px]', 'stroke-red-600', 'stroke-green-500',
		'w-[250px]', 'w-[200px]', 'size-12', 'capitalize', 'uppercase', 'w-full', 'h-full'
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			strokeWidth: {
				3: '3',
				4: '4',
			},			

			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
        		},
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--bits-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--bits-accordion-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
        		"accordion-down": "accordion-down 0.2s ease-out",
        		"accordion-up": "accordion-up 0.2s ease-out",
       			"caret-blink": "caret-blink 1.25s ease-out infinite",
      		},
		},
	},
	plugins: [tailwindcssAnimate],
};

export default config;
