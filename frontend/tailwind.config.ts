import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Quattrocento Sans, sans-serif",
        body: "Inter, system-ui",
        sans: "Inter, system-ui", // This replaces the document wide default font.
      },

      fontSize: {
        sm: "0.833rem",
        base: "1rem",
        lg: "1.44rem",
        xl: "1.728rem",
        "2xl": "2.074rem",
        "3xl": "2.488rem",
        "4xl": "2.986rem",

        "md-lg": "1.266rem",
        "md-xl": "1.424rem",
        "md-2xl": "1.602rem",
        "md-3xl": "1.802rem",
        "md-4xl": "2.027rem",
      },

      colors: {
        primary: "#65AE45",
        secondary: "#F2F2F2",
        black: "#1F1C20",
        black85: "#403E42",
        black75: "#575558",
        black50: "#8F8D8F",
        black25: "#C7C6C7",
        white: "#FFFFFF",
        warning: "#CC2929",
        warningBg: "#FFE6E6",
        warningHover: "#FF3333",
        warningDark: "#EA2626",
        warningBgDark: "#332424",
        accent: "#FFD700",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        short: { raw: "(min-height: 720px)" },
        mid: { raw: "(min-height: 800px)" },
        tall: { raw: "(min-height: 1080px)" },
      },
    },
    // Adding smaller breakpoints has to be done this way. https://tailwindcss.com/docs/screens#adding-smaller-breakpoints
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
export default config;

