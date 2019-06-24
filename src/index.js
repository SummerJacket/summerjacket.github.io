import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  HemisphereLightHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Color,
  Euler
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
let models;

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
  scene.background = new Color(payload.background);

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

  const { position: cPos, rotation: cRot } = payload.camera.transform;
  camera.position.set(cPos.x, cPos.y, cPos.z);
  camera.setRotationFromEuler(new Euler(cRot.x, cRot.y, cRot.z, cRot.order));
  camControls.screenSpacePanning = true;
  camControls.update();

  // -- LIGHTS -------------------------------------------------------

  payload.lights.forEach(light => {
    let lightObj;

    switch (light.type) {
      case "DIRECTIONAL_LIGHT":
        lightObj = new DirectionalLight(light.color, light.intensity);
        lightObj.position.set(
          light.position.x,
          light.position.y,
          light.position.z
        );

        if (light.helperEnabled) {
          scene.add(new DirectionalLightHelper(lightObj, 2));
        }
        break;
      case "HEMISPHERE_LIGHT":
        lightObj = new HemisphereLight(
          light.skyColor,
          light.groundColor,
          light.intensity
        );

        if (light.helperEnabled) {
          scene.add(new HemisphereLightHelper(lightObj, 2));
        }
        break;
    }

    scene.add(lightObj);
  });

  // -- MODELS -------------------------------------------------------

  models = payload.models.reduce((acc, curr, i) => {
    loader.load(curr.url, gltf => {
      scene.add(gltf.scene);
      gltf.scene.position.set(
        curr.transform.position.x,
        curr.transform.position.y,
        curr.transform.position.z
      );
      acc[i] = gltf;
    });

    return acc;
  }, []);

  // -- EVENTS -------------------------------------------------------

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

const update = payload => {
  models.forEach((model, i) => {
    // check for unloaded model
    if (!model) return;

    const mPos = payload.models[i].transform.position;
    model.scene.position.set(mPos.x, mPos.y, mPos.z);
  });

  if (payload.camera.controlsEnabled) {
    camControls.update();
  } else {
    const {
      position: cPos
      // rotation: cRot
    } = payload.camera.transform;

    camera.position.set(cPos.x, cPos.y, cPos.z);
    // rotation never changes
    // camera.setRotationFromEuler(new Euler(cRot.x, cRot.y, cRot.z, cRot.order));
  }

  renderer.render(scene, camera);
};

app.ports.threeOut.subscribe(([action, payload]) => {
  if (action === "INIT") {
    init(payload);
  }

  update(payload);
});

registerServiceWorker();
