import App from "./App.svelte";
import "./style.css";

const app = new App({
  target: document.body,
  intro: true,
});

window.app = app;

export default app;
