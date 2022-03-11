import { defineConfig } from "windicss/helpers";
// import colors from 'windicss/colors'
import typography from "windicss/plugin/typography";
import plugin from "windicss/plugin";
import { colors, typos } from "./themes/default/index";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,

  plugins: [
    typography(),
    plugin(({ addComponents }) => {
      addComponents({
        ".min-page": {
          minHeight: "calc(100vh - 72px)",
        },
      });
    }),
  ],
  theme: {
    extend: {
      colors,
      ...typos,
      screens: {
        smmb: "320px",
        mdmb: "480px",
        smtb: "768px",
        mdtb: "1024px",
        smdt: "1281px",
        mddt: "1440px",
        mdhd: "1920px",
      },
      fontSize: {
        "3xl": "2.0em",
        "2xs": ".70rem",
        "3xs": ".65rem",
        "4xs": ".60rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
