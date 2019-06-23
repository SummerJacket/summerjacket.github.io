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
import "./build.css";
import { Elm } from "./Main.elm";
import registerServiceWorker from "./registerServiceWorker";

const app = Elm.Main.init({
  node: document.getElementById("root")
});

let renderer, scene, camera, camControls;

const init = payload => {
  // -- renderer --
  renderer = new WebGLRenderer({ antialias: payload.antialias });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = payload.gammaInput;
  renderer.gammaOutput = payload.gammaOutput;
  renderer.gammaFactor = payload.gammaFactor;
  renderer.shadowMap.enabled = payload.shadowMapEnabled;

  document.body.appendChild(renderer.domElement);

  // -- scene --
  scene = new Scene();
  scene.background = new Color(payload.scene.background);
  scene.fog = new Fog(
    payload.scene.fog.color,
    payload.scene.fog.near,
    payload.scene.fog.far
  );

  // -- camera --
  camera = new PerspectiveCamera(
    payload.camera.fov,
    window.innerWidth / window.innerHeight,
    payload.camera.near,
    payload.camera.far
  );

  camControls = (() => {
    if (payload.camera.controlsEnabled) {
      return new OrbitControls(camera, renderer.domElement);
    }

    return {
      update() {} // do nothing
    };
  })();

  const { position: cPos } = payload.camera;
  camera.position.set(cPos.x, cPos.y, cPos.z);
  camControls.screenSpacePanning = true;
  camControls.update();

  // -- lights --

  // -- skydome --

  // -- models --

  // -- events --
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

const update = () => {
  camControls.update();
  renderer.render(scene, camera);
  app.ports.threeIn.send("ignored");
};

app.ports.threeOut.subscribe(([action, payload]) => {
  switch (action) {
    case "INIT":
      init(payload);
      break;
    case "UPDATE":
      // do nothing
      break;
  }
  requestAnimationFrame(update);
});

registerServiceWorker();
