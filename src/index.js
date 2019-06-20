// import './scene.js';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  HemisphereLightHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  Color,
  BackSide,
  SphereBufferGeometry,
  ShaderMaterial,
  Fog
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as Shaders from "./shaders";
import './build.css';
import { Elm } from './Main.elm';
import registerServiceWorker from './registerServiceWorker';

const app = Elm.Main.init({
  node: document.getElementById('root'),
});

const update = payload => () => {
  // payload.count++;
  app.ports.threeIn.send(payload);
};

app.ports.threeOut.subscribe(payload => {
  requestAnimationFrame(update(payload));
});

registerServiceWorker();
