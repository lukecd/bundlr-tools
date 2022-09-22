/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				tertiary: "var(--tertiary)",
				text: "var(--text)",
				errorText: "var(--errorText)",
			},
		},
	},

	plugins: [],
};
