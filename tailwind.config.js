/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				error: "#FF0000",
			},
		},
	},
	plugins: [],
}
