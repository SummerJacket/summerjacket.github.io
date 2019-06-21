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

const model = {
  tick: 0,
  gammaInput: undefined,
  gammaOutput: undefined,
  gammaFactor: undefined,
  shadowMapEnabled: undefined,
  antialias: undefined,
  scene: undefined,
  camera: undefined,
  camControls: undefined
};

const init = payload => {
  // -- renderer --
  model.renderer = new WebGLRenderer({ antialias: payload.antialias });
  model.renderer.setSize(window.innerWidth, window.innerHeight);
  model.renderer.gammaInput = payload.gammaInput;
  model.renderer.gammaOutput = payload.gammaOutput;
  model.renderer.gammaFactor = payload.gammaFactor;
  model.renderer.shadowMap.enabled = payload.shadowMapEnabled;

  document.body.appendChild(model.renderer.domElement);

  // -- scene --
  model.scene = new Scene();
  model.scene.background = new Color(payload.scene.background);
  model.scene.fog = new Fog(
    payload.scene.fog.color,
    payload.scene.fog.near,
    payload.scene.fog.far
  );

  // -- camera --
  model.camera = new PerspectiveCamera(
    payload.camera.fov,
    window.innerWidth / window.innerHeight,
    payload.camera.near,
    payload.camera.far
  );

  model.camControls = (() => {
    if (payload.camera.controlsEnabled) {
      return new OrbitControls(model.camera, model.renderer.domElement);
    }

    return {
      update() {} // do nothing
    };
  })();

  const { position: cPos } = payload.camera;
  model.camera.position.set(cPos.x, cPos.y, cPos.z);
  model.camControls.screenSpacePanning = true;
  model.camControls.update();

  // -- lights --
  // -- skydome --
  // -- models --
  // -- events --

  window.addEventListener("resize", () => {
    model.camera.aspect = window.innerWidth / window.innerHeight;
    model.camera.updateProjectionMatrix();
    model.renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

const update = () => {
  model.camControls.update();
  model.renderer.render(model.scene, model.camera);
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
