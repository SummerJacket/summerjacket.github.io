import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  HemisphereLightHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Color,
  Fog
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./build.css";
import { Elm } from "./Main.elm";
import registerServiceWorker from "./registerServiceWorker";

const app = Elm.Main.init({
  node: document.getElementById("root")
});

const loader = new GLTFLoader();

let renderer, scene, camera, camControls;
let lights, models;

const init = payload => {
  // -- RENDERER -----------------------------------------------------
  renderer = new WebGLRenderer({ antialias: payload.antialias });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = payload.gammaInput;
  renderer.gammaOutput = payload.gammaOutput;
  renderer.gammaFactor = payload.gammaFactor;
  renderer.shadowMap.enabled = payload.shadowMapEnabled;

  document.body.appendChild(renderer.domElement);

  // -- SCENE --------------------------------------------------------
  scene = new Scene();
  scene.background = new Color(payload.scene.background);
  scene.fog = new Fog(
    payload.scene.fog.color,
    payload.scene.fog.near,
    payload.scene.fog.far
  );

  // -- CAMERA -------------------------------------------------------
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

  // -- LIGHTS -------------------------------------------------------
  lights = payload.lights.reduce((acc, curr) => {
    let light;

    switch (curr.type) {
      case "DIRECTIONAL_LIGHT":
        light = new DirectionalLight(curr.color, curr.intensity);
        light.position.set(curr.position.x, curr.position.y, curr.position.z);

        if (curr.helperEnabled) {
          scene.add(new DirectionalLightHelper(light, 2));
        }
        break;
      case "HEMISPHERE_LIGHT":
        light = new HemisphereLight(
          curr.skyColor,
          curr.groundColor,
          curr.intensity
        );

        if (curr.helperEnabled) {
          scene.add(new HemisphereLightHelper(light, 2));
        }
        break;
    }

    scene.add(light);
    acc.push(light);
    return acc;
  }, []);

  // -- MODELS -------------------------------------------------------
  models = payload.models.reduce((acc, curr) => {
    loader.load(curr.url, gltf => {
      scene.add(gltf.scene);
      gltf.scene.position.set(
        curr.position.x,
        curr.position.y,
        curr.position.z
      );
      acc.push(gltf);
    });

    return acc;
  }, []);

  window.models = models;

  // -- EVENTS -------------------------------------------------------
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

const update = payload => () => {
  models.forEach((model, i) => {
    const { position: mPos } = payload.models[i];
    model.scene.position.set(mPos.x, mPos.y, mPos.z);
  });

  camControls.update();
  renderer.render(scene, camera);
  app.ports.threeIn.send();
};

app.ports.threeOut.subscribe(([action, payload]) => {
  if (action === "INIT") {
    init(payload);
  }

  requestAnimationFrame(update(payload));
});

registerServiceWorker();
