/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
      },
      colors: {
        "main-light": "var(--main-clr-light)",
        main: "var(--main-clr)",
        "main-pale": "var(--main-clr-pale)",
        "second-light": "var(--second-clr-light)",
        second: "var(--second-clr)",
        "second-pale": "var(--second-clr-pale)",
        blue: "var(--blue-clr)",
        pink: "var(--pink-clr)",
        "pink-light": "var(--pink-clr-light)",
        "text-stroke": "var(--text-clr-stroke)",
        text: "var(--text-clr)",
        "text-mutated": "var(--text-clr-mutated)",
        shadow: "var(--shadow-clr)",
        "shadow-plate": "var(--shadow-clr-plate)",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)"],
      },
    },
  },
  plugins: [],
};
