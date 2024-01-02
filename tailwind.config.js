// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/screens/public/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#ffffff",
						content1: {
							DEFAULT: "#f3f3f3",
						},
						content2: {
							DEFAULT: "#4f4f4f",
						},
						content3: {
							DEFAULT: "#f9f9f9",
						},
						content4: {
							DEFAULT: "#739072",
						},
						foreground: {
							DEFAULT: "#4f4f4f",
							foreground: "#F5F5F5",
						},
						primary: {
							100: "#DCD7FA",
							200: "#BAB0F5",
							300: "#9083E3",
							400: "#6B5EC7",
							500: "#3D30A2",
							600: "#2D238B",
							700: "#201874",
							800: "#150F5D",
							900: "#0D094D",
						},
						secondary: {
							100: "#CCFAFF",
							200: "#99F0FF",
							300: "#66DEFF",
							400: "#3FCAFF",
							500: "#00A9FF",
							600: "#0083DB",
							700: "#0062B7",
							800: "#004593",
							900: "#00317A",
						},
						success: {
							100: "#C4F5CC",
							200: "#8DECA6",
							300: "#4FC67A",
							400: "#238D54",
							500: "#004225",
							600: "#003825",
							700: "#002F24",
							800: "#002620",
							900: "#001F1E",
						},
						warning: {
							100: "#FFEACC",
							200: "#FFD099",
							300: "#FFAF66",
							400: "#FF8F3F",
							500: "#FF5B00",
							600: "#DB4000",
							700: "#B72A00",
							800: "#931900",
							900: "#7A0D00",
						},
						danger: {
							100: "#FDD2CA",
							200: "#FB9C96",
							300: "#F36167",
							400: "#E73951",
							500: "#D80032",
							600: "#B9003C",
							700: "#9B0041",
							800: "#7D0041",
							900: "#67003F",
						},
					},
				},
				dark: {
					colors: {
						background: "#212121",
						content1: {
							DEFAULT: "#292929",
						},
						content2: {
							DEFAULT: "#fff",
						},
						content3: {
							DEFAULT: "#313131",
						},
						content4: {
							DEFAULT: "#232323",
						},
						foreground: {
							DEFAULT: "#4f4f4f",
							foreground: "#002620",
						},
						primary: {
							100: "#DCD7FA",
							200: "#BAB0F5",
							300: "#9083E3",
							400: "#6B5EC7",
							500: "#3D30A2",
							600: "#2D238B",
							700: "#201874",
							800: "#150F5D",
							900: "#0D094D",
						},
						secondary: {
							100: "#CCFAFF",
							200: "#99F0FF",
							300: "#66DEFF",
							400: "#3FCAFF",
							500: "#00A9FF",
							600: "#0083DB",
							700: "#0062B7",
							800: "#004593",
							900: "#00317A",
						},
						success: {
							100: "#C4F5CC",
							200: "#8DECA6",
							300: "#4FC67A",
							400: "#238D54",
							500: "#004225",
							600: "#003825",
							700: "#002F24",
							800: "#002620",
							900: "#001F1E",
						},
						warning: {
							100: "#FFEACC",
							200: "#FFD099",
							300: "#FFAF66",
							400: "#FF8F3F",
							500: "#FF5B00",
							600: "#DB4000",
							700: "#B72A00",
							800: "#931900",
							900: "#7A0D00",
						},
						danger: {
							100: "#FDD2CA",
							200: "#FB9C96",
							300: "#F36167",
							400: "#E73951",
							500: "#D80032",
							600: "#B9003C",
							700: "#9B0041",
							800: "#7D0041",
							900: "#67003F",
						},
					},
				},
			},
		}),
	],
};
