/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#20C997", // Spotify-like accent (adjusted to your existing teal)
          dark: "#1ED760", // Spotify's actual green
        },
        neutral: {
          light: "#FFFFFF", // Spotify light mode background
          DEFAULT: "#B3B3B3", // Spotify secondary text
          dark: "#000000", // Spotify light mode secondary elements

          // Spotify dark mode palette
          "dark-bg": "#121212", // Main dark background
          "dark-elevated": "#181818", // Cards/containers
          "dark-secondary": "#383838", // Secondary elements
          "dark-hover": "#1A1A1A", // Hover states
          "dark-text": "#FFFFFF", // Primary text
          "dark-text-secondary": "#B3B3B3", // Secondary text
        },
      },
      transitionDuration: {
        200: "200ms",
      },
      scale: {
        200: "2",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        dark: theme("colors.neutral.dark-bg"),
        "dark-elevated": theme("colors.neutral.dark-elevated"),
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        dark: theme("colors.neutral.dark-text"),
        "dark-secondary": theme("colors.neutral.dark-text-secondary"),
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        dark: "#404040", // Spotify's border color
      }),
    },
  },
  plugins: [],
};
