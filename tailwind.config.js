/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 1199px) { ... }
      xl: "1170px",
      // => @media (min-width: 1240px) { ... }
      "1xl": "1240px",
      // => @media (min-width: 1440px) { ... }
      "2xl": "1472px",
    },
    colors: {
      black: "#000000",
      white: "#ffffff",
      transparent: "transparent",
      green: {
        100: "#ddede8",
        200: "#abd1c6",
        300: "#eef6f3",
        400: "#f3f9f7",
        500: "#c9e1da",
        800: "#004643",
        900: "#001e1d",
      },
      gray: {
        100: "#777777",
        200: "#bbbbbb",
        300: "#f6f6f6",
        400: "#e7f1ed",
        600: "#333333",
        700: "#232323",
        800: "#989898",
        900: "#1e1d1f",
      },
      yellow: {
        900: "#f9bc60",
      },
    },
    extend: {
      fontFamily: {
        "proxima-nova": [
          "Proxima Nova",
          "sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      fontSize: {
        "1xl": "22px",
        "3xl": "35px",
        "4xl": "42px",
        md: "16px",
      },
      spacing: {
        full: "100%",
      },
      boxShadow: {
        green: "rgba(0, 70, 67, 0.10) 11px 0px 29px",
        box: "rgba(0, 70, 67, 0.10) 4px 0px 22px",
        boxhover: "rgba(0, 70, 67, 0.15) 0px 10px 18px",
        input: "rgba(0, 70, 67, 0.04) 0px 8px 20px",
        topbar: "rgba(0, 70, 67, 0.10) 4px 0px 54px",
        tabbox: "rgba(0, 70, 67, 0.06) 12px 0px 18px",
        review: "rgba(0, 70, 67, 0.08) 0px 0px 32px",
        btn: "rgba(0, 70, 67, 0.08) 5px 8px 12px",
      },
      borderRadius: {
        "5xl": "60px",
        xl: "10px",
        "1xl": "12px",
        "2xl": "15px",
        "4xl": "20px",
        1.5: "6px",
      },
      margin: {
        auto: "auto",
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      height: {
        "100vw": "100vw",
      },
      content: {},
      transitionDuration: {
        0: "0ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
