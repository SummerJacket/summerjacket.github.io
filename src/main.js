import "alpinejs";
import "./style.css";
import "./post-content.css";

const DARK_MODE_ENABLED = "dark-mode-enabled";

function app() {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = JSON.parse(localStorage.getItem(DARK_MODE_ENABLED));

  return {
    darkModeEnabled: prefersDark || savedTheme,
    toggleDarkMode() {
      this.darkModeEnabled = !this.darkModeEnabled;
      localStorage.setItem(DARK_MODE_ENABLED, this.darkModeEnabled);
    }
  };
}

window.app = app;
