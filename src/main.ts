import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff);

//initialization
//const loader = new THREE.TextureLoader();
//loading texture
//const texture = loader.load("textures/alexander-grey-TMwHpCrU8D4-unsplash.jpg");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app") as HTMLCanvasElement,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const vsh = await fetch("./shaders/vertex-shader.glsl");
const fsh = await fetch("./shaders/fragment-shader.glsl");

const material2 = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Vector4(0.9, 0.9, 0.9, 1.0) },
    color2: { value: new THREE.Vector4(0.6, 0.6, 0.6, 1.0) },
  },
  vertexShader: await vsh.text(),
  fragmentShader: await fsh.text(),
});

const colors = [
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ffff),
];

const colorfloats = colors.map((c) => c.toArray()).flat();

const geometry2 = new THREE.BoxGeometry(50, 50, 50);
geometry2.setAttribute(
  "khColors",
  new THREE.Float32BufferAttribute(colorfloats, 3)
);

material2.side = THREE.BackSide;
const plane = new THREE.Mesh(geometry2, material2);
plane.position.set(0.5, 0.5, 0);
scene.add(plane);

//scene.background = material2;

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00fe00,
  wireframe: false,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
