const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem"
      },
      colors: {
        gray: {
          ...colors.gray,
          "750": "#374459",
          "850": "#252D3B",
          "950": "#0E131C"
        },
        blue: {
          ...colors.blue,
          "750": "#2E5A94"
        }
      },
      fontFamily: {
        sans:
          '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      fontSize: {
        huge: "10rem",
        massive: "20rem"
      },
      gridTemplateColumns: {
        auto1: "auto 1fr"
      },
      gridTemplateRows: {
        auto1: "auto 1fr"
      },
      opacity: {
        "10": 0.1
      },
      spacing: {
        "2px": "2px"
      }
    }
  },
  variants: {
    textColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark-hover",
      "dark-group-hover"
    ],
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark-hover",
      "dark-group-hover"
    ],
    borderColor: ["responsive", "hover", "focus", "dark", "dark-hover"],
    boxShadow: ["responsive", "hover", "focus", "dark", "dark-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    height: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus", "group-hover"],
    translate: ["responsive", "hover", "focus", "group-hover"]
  },
  plugins: [require("tailwindcss-dark-mode")()]
};
