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
  Fog,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as Shaders from './shaders';

// -- FLAGS ---------------------------------------------------------

const camControlsEnabled = false;
const lightHelpersEnabled = false;
const dimSkyDome = false;

// -- RENDERER ------------------------------------------------------

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// -- SCENE ---------------------------------------------------------

const scene = new Scene();
scene.background = new Color().setHSL(0.6, 0, 1);
scene.fog = new Fog(scene.background, 1, 3000);

// -- CAMERA --------------------------------------------------------

const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);

const camControls = (() => {
  if (camControlsEnabled) {
    return new OrbitControls(camera, renderer.domElement);
  }

  return {
    update() {}, // do nothing
  };
})();

camera.position.set(2, 20, 50);
camControls.update();

// -- LIGHTS --------------------------------------------------------

const dirLight = new DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(1, 0.5, 0);
dirLight.position.multiplyScalar(40);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
const d = 50;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;
scene.add(dirLight);

const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.8);
// hemiLight.color.setHSL(0.1, 0.5, 0.6);
hemiLight.color.setHSL(0.6, 0.9, 0.75);
hemiLight.groundColor.setHSL(0.05, 1, 0.1);
hemiLight.position.set(0, 40, 0);
scene.add(hemiLight);

if (lightHelpersEnabled) {
  scene.add(new DirectionalLightHelper(dirLight, 10));
  scene.add(new HemisphereLightHelper(hemiLight, 10));
}

// -- SKYDOME -------------------------------------------------------

const uniforms = {
  topColor: { value: new Color(0xf8f8f8) },
  bottomColor: { value: new Color(0xf8f8f8) },
  offset: { value: 100 },
  exponent: { value: 0.6 },
};

if (dimSkyDome) {
  const dimColor = new Color(0x404040);
  uniforms.topColor.value.copy(dimColor);
  uniforms.bottomColor.value.copy(dimColor);
}

scene.fog.color = new Color(0xf8f8f8);
const skyGeo = new SphereBufferGeometry(4000, 32, 15);
const skyMat = new ShaderMaterial({
  uniforms,
  vertexShader: Shaders.vertexShader,
  fragmentShader: Shaders.fragmentShader,
  side: BackSide,
});
scene.add(new Mesh(skyGeo, skyMat));

// -- MODELS --------------------------------------------------------

const gloader = new GLTFLoader();

const loadModel = (model, onLoad, onProgress, onError) => {
  gloader.load(
    model,
    gltf => {
      gltf.scene.children.forEach(mesh => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      });

      if (onLoad) {
        onLoad(gltf);
      }

      scene.add(gltf.scene);
    },
    onProgress,
    onError,
  );
};

const models = {
  bigIsland: { ref: undefined, y: 0 },
  smallIsland: { ref: undefined, y: 0 },
  rock1: { ref: undefined, y: 0 },
  rock2: { ref: undefined, y: 0 },
  rock3: { ref: undefined, y: 0 },
};

loadModel('models/big_island.glb', gltf => {
  models.bigIsland.ref = gltf;
  gltf.scene.translateX(20);
});
loadModel('models/small_island.glb', gltf => {
  models.smallIsland.ref = gltf;
  gltf.scene.translateX(24);
});
loadModel('models/rock1.glb', gltf => {
  models.rock1.ref = gltf;
  gltf.scene.translateX(20);
});
loadModel('models/rock2.glb', gltf => {
  models.rock2.ref = gltf;
  gltf.scene.translateX(20);
});
loadModel('models/rock3.glb', gltf => {
  models.rock3.ref = gltf;
  gltf.scene.translateX(20);
});

// -- EVENTS --------------------------------------------------------

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// -- ANIMATE -------------------------------------------------------

let tick = 0;

const updateIslands = () => {
  const updateIsland = (name, ypos) => {
    if (models[name].ref) {
      models[name].ref.scene.position.y = ypos;
    }
  };

  updateIsland('bigIsland', Math.cos(tick * -0.005) * 0.75);
  updateIsland('smallIsland', Math.sin(tick * 0.009));
  updateIsland('rock1', Math.sin(1 + tick * 0.01));
  updateIsland('rock2', Math.sin(2 + tick * 0.01));
  updateIsland('rock3', Math.sin(3 + tick * 0.01));
};

const updateCamera = () => {
  const { scrollTop } = document.documentElement;

  const cameraOffset = {
    x: 0,
    y: 10,
  };

  const scrollPositionParallaxFactor = 0.06;
  const mouseMoveCameraFactor = {
    x: 0.002,
    y: 0.0005,
  };
  const scrollY = scrollTop * scrollPositionParallaxFactor;
  const pivotX = (mouse.x - window.innerWidth / 2) * mouseMoveCameraFactor.x;
  const pivotY = (mouse.y - window.innerHeight / 2) * mouseMoveCameraFactor.y;
  const camX = pivotX + cameraOffset.x;
  const camY = -pivotY + cameraOffset.y - scrollY;
  camera.position.setX(camX);
  camera.position.setY(camY);
  camera.lookAt(-cameraOffset.x, camY - cameraOffset.y, 0);
};

const animate = () => {
  requestAnimationFrame(animate);

  tick += 1;

  updateIslands();

  if (camControlsEnabled) {
    camControls.update();
  } else {
    updateCamera();
  }

  renderer.render(scene, camera);
};

animate();

// -- EXPOSE TO CLIENT ----------------------------------------------

window.mouse = mouse;
