//import threejs libraries
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import socialcirclefont from './Social Media Circled_Regular.json?url';
import resumepdf from './Nathan Castro Resume.pdf?url';
import projectsjpg from './projectssection.jpg?url';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

//controls
//const controls = new OrbitControls(camera, renderer.domElement);

//window resize

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//text-shapes
const loader = new FontLoader();
const font = loader.load(socialcirclefont,
  function (font) {
    const geometry1 = new TextGeometry('C', {
      font: font,
      size: 4,
      height: 0.35,
    })
    const geometry2 = new TextGeometry('m', {
      font: font,
      size: 4,
      height: 0.35,
    })
    const geometry3 = new TextGeometry('M', {
      font: font,
      size: 4,
      height: 0.35,
    })
    const geometry4 = new TextGeometry('f', {
      font: font,
      size: 4,
      height: 0.35,
    })
    const geometry5 = new TextGeometry('D', {
      font: font,
      size: 4,
      height: 0.35,
    })
    const geometry6 = new TextGeometry(')', {
      font: font,
      size: 4,
      height: 0.35,
    })

    const linkedin = new THREE.Mesh(geometry1, [
      new THREE.MeshPhongMaterial({ color: 0x0A66C2 }),
      new THREE.MeshPhongMaterial({ color: 0x0A66C2 })
    ])
    const resume = new THREE.Mesh(geometry2, [
      new THREE.MeshPhongMaterial({ color: 0x2ECC71 }),
      new THREE.MeshPhongMaterial({ color: 0x2ECC71 })
    ])
    const youtube = new THREE.Mesh(geometry3, [
      new THREE.MeshPhongMaterial({ color: 0xFF0000 }),
      new THREE.MeshPhongMaterial({ color: 0xFF0000 })
    ])
    const projects = new THREE.Mesh(geometry4, [
      new THREE.MeshPhongMaterial({ color: 0x707B7C }),
      new THREE.MeshPhongMaterial({ color: 0x707B7C })
    ])
    const twitter = new THREE.Mesh(geometry5, [
      new THREE.MeshPhongMaterial({ color: 0x1D9BF0 }),
      new THREE.MeshPhongMaterial({ color: 0x1D9BF0 })
    ])
    const github = new THREE.Mesh(geometry6, [
      new THREE.MeshPhongMaterial({ color: 0x211F1F }),
      new THREE.MeshPhongMaterial({ color: 0x211F1F })
    ])

    linkedin.position.x = -20;
    //linkedin.position.y = 7;
    linkedin.geometry.center();
    linkedin.castShadow = true;
    linkedin.name = "linkedin";
    linkedin.userData = { URL: "https://www.linkedin.com/in/nathanjcastro" };
    //resume.position.y = 7;
    resume.position.x = -12;
    resume.geometry.center();
    resume.castShadow = true;
    resume.name = "resume";
    resume.userData = { URL: resumepdf };
    //youtube.position.y = 7;
    youtube.position.x = -4;
    youtube.geometry.center();
    youtube.castShadow = true;
    youtube.name = "youtube";
    youtube.userData = { URL: "https://www.youtube.com/channel/UCJq63xCQa_HK-RaphD4LRXg" };
    projects.position.x = 4;
    // projects.position.y = 7;
    projects.geometry.center();
    projects.castShadow = true;
    projects.name = "projects";
    projects.userData = { URL: projectsjpg };
    //twitter.position.y = 7;
    twitter.position.x = 12;
    twitter.geometry.center();
    twitter.castShadow = true;
    twitter.name = "twitter";
    twitter.userData = { URL: "https://twitter.com/NateSimons11" };
    //github.position.y = 7;
    github.position.x = 20;
    github.geometry.center();
    github.castShadow = true;
    github.name = "github";
    github.userData = { URL: "https://github.com/11Nate11" };
    scene.add(linkedin)
    scene.add(resume)
    scene.add(youtube)
    scene.add(projects)
    scene.add(twitter)
    scene.add(github)

  });

//lighting
scene.add(new THREE.AmbientLight(0xffffff, .5));

const plight = new THREE.PointLight(0xffffff, 1, 100);
plight.position.set(0, 30, 45);
plight.castShadow = true;
scene.add(plight);

//plane


//animate
function animate() {
  requestAnimationFrame(animate);
  //controls.update();

  scene.getObjectByName("linkedin").rotation.y -= 0.01;
  scene.getObjectByName("resume").rotation.y -= 0.01;
  scene.getObjectByName("youtube").rotation.y -= 0.01;
  scene.getObjectByName("projects").rotation.y -= 0.01;
  scene.getObjectByName("twitter").rotation.y -= 0.01;
  scene.getObjectByName("github").rotation.y -= 0.01;

  renderer.render(scene, camera);
}

//mouseselecc
const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();

window.addEventListener("click", event => {

  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);

  if (found.length > 0) {
    window.open(found[0].object.userData.URL);
  }
});

animate()
