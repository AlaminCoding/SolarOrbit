const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(10, 30, 30);
const sunTexture = new THREE.TextureLoader().load("/sun.jpg");
const material = new THREE.MeshBasicMaterial({
  map: sunTexture,
  transparent: true,
  opacity: 1,
});
const sun = new THREE.Mesh(geometry, material);

const earthGeo = new THREE.SphereGeometry(5, 30, 30);

const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
const earthMat = new THREE.MeshPhongMaterial({
  map: earthTexture,
  transparent: true,
  opacity: 1,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.set(0, 0, 50);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

camera.position.set(0, 50, 150);
camera.lookAt(0, 0, 0);
scene.add(sun);
scene.add(earth);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 30, 30);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  sphere.position.set(x, y, z);
  scene.add(sphere);
}

for (let i = 0; i < 200; i++) {
  addStar();
}

// const spaceTexture = new THREE.TextureLoader().load(
//   "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
// );
// scene.background = spaceTexture;

const controls = new THREE.OrbitControls(camera, renderer.domElement);

var r = 50;
var theta = 0;
var dTheta = (2 * Math.PI) / 1000;

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y -= 0.05;
  sun.rotation.y -= 0.0005;
  theta += dTheta;
  earth.position.x = r * Math.cos(theta);
  earth.position.z = r * Math.sin(theta);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
