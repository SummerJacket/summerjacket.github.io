const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      sans:
        '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          "750": "#374459",
          "850": "#252D3B",
          "950": "#0E131C",
        },
        blue: {
          ...colors.blue,
          "750": "#2E5A94",
        },
      },
    },
  },
  variants: {
    textColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark-hover",
      "dark-group-hover",
    ],
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark-hover",
      "dark-group-hover",
    ],
    borderColor: ["dark"],
    boxShadow: ["responsive", "hover", "focus", "dark", "dark-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    height: ["responsive", "hover", "group-hover"],
  },
  plugins: [require("tailwindcss-dark-mode")()],
};
