import * as flags from './scene.js';
import './build.css';
import { Elm } from './Main.elm';
import registerServiceWorker from './registerServiceWorker';

Elm.Main.init({
  node: document.getElementById('root'),
  flags
});

registerServiceWorker();
