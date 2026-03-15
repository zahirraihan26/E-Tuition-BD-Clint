/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#F59E0B", // Amber-600 (More Golden)
          secondary: "#4F46E5", // Indigo-600
          accent: "#EC4899", // Pink-500
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#F1F5F9",
        },
        dark: {
          primary: "#F59E0B", // Amber-600
          secondary: "#6366F1", // Indigo-500
          accent: "#F472B6", // Pink-400
          "base-100": "#020617", // Midnight Indigo (Deepest Black/Blue)
          "base-200": "#0F172A", // Slate-900
          "base-300": "#1E293B", // Slate-800
          "neutral": "#0F172A",
          "neutral-content": "#F8FAFC",
          "base-content": "#E2E8F0", // Slate-200 (Softer Text)
        },
      },
    ],
  },
}
