/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "spin-reverse-slow": "spin-reverse 10s linear infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 3s ease-in-out infinite",
        "scale-pulse": "scale-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.1)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.05)" },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      colors: {
        darkBlack: "#2E2B36",
        lightBlack: "#818181",
        normalTextColor: "#414141",
        bg: "#FEFEF8",
        brandBg: "#E5DD64",
        brandLight: "#FDFDE5",
      },
      fontFamily: {
        rubiklight_300: ["Rubik-Light", "sans-serif"],
        rubiklightItalic_300: ["Rubik-LightItalic", "sans-serif"],
        rubikregular_400: ["Rubik-Regular", "sans-serif"],
        rubikregularItalic_400: ["Rubik-Italic", "sans-serif"],
        rubikmedium_500: ["Rubik-Medium", "sans-serif"],
        rubikmediumItalic_500: ["Rubik-MediumItalic", "sans-serif"],
        rubiksemibold_600: ["Rubik-SemiBold", "sans-serif"],
        rubiksemiboldItalic_600: ["Rubik-SemiBoldItalic", "sans-serif"],
        rubikbold_700: ["Rubik-Bold", "sans-serif"],
        rubikboldItalic_700: ["Rubik-BoldItalic", "sans-serif"],
        rubikextrabold_800: ["Rubik-ExtraBold", "sans-serif"],
        rubikextraboldItalic_800: ["Rubik-ExtraBoldItalic", "sans-serif"],
        rubikblack_900: ["Rubik-Black", "sans-serif"],
        rubikblackItalic_900: ["Rubik-BlackItalic", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
