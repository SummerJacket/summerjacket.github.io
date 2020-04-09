import Konami from "konami";

import "./main.css";
import { Elm } from "./Main.elm";
import * as serviceWorker from "./serviceWorker";
import projects from "!!raw-loader!./projects.yaml";

const app = Elm.Main.init({
  node: document.getElementById("root"),
  flags: {
    projects,
    prefersDark:
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
});

new Konami(() => app.ports.easterEgg.send(null));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
