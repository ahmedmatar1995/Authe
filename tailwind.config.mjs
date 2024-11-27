/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				primary:{
					blue:"#2B38B3"
				}
			}
		},
	},
	plugins: [require("daisyui"), require("tailwindcss-motion")],
}
