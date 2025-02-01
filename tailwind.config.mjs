/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20C997", // Teal
        neutral: {
          light: "#F9FAFB", // Light gray for backgrounds
          DEFAULT: "#6B7280", // Neutral gray
          dark: "#374151", // Darker gray
        },
      },
      scale: {
        '200': '2',
      }
    },
  },
  plugins: [],
};
