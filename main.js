import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let loadedModel;
const loader = new GLTFLoader();
// Load a glTF resource
loader.load(
	// resource URL
	'./amogus.glb',
	// called when the resource is loaded
	function ( gltf ) {
        loadedModel = gltf;
        console.log(loadedModel);

        gltf.scene.rotation.x = 0.2;
        gltf.scene.position.y = -150;
        gltf.scene.scale.set(1.5,1.5,1.5);
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

        renderer.render(scene,camera);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.error( 'An error happened :',error );
	}
);

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 30); // (color, intensity)
topLight.position.set(0, 0, 500) //top
topLight.castShadow = true;
scene.add(topLight);

// const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
// scene.add(ambientLight);

const behindLight = new THREE.DirectionalLight(0xffffff, 75); // (color, intensity)
behindLight.position.set(0, 0, -300) //behind
behindLight.castShadow = true;
scene.add(behindLight);

const belowLight = new THREE.DirectionalLight(0xffffff, 15); // (color, intensity)
belowLight.position.set(0, -500, 0) //below
belowLight.castShadow = true;
scene.add(belowLight);

// const light1 = new THREE.PointLight(0xc4c4c4, 10);
// light1.position.set(0,300,500);
// scene.add(light1);

// const light2 = new THREE.PointLight(0xc4c4c4, 10);
// light2.position.set(500,100,0);
// scene.add(light2);

// const light3 = new THREE.PointLight(0xc4c4c4, 10);
// light3.position.set(0,100,-500);
// scene.add(light3);

// const light4 = new THREE.PointLight(0xc4c4c4, 50);
// light4.position.set(0,0,-300);
// scene.add(light4);

// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00 } );
// const cube = new THREE.Mesh(geometry,material);
// scene.add(cube);

//Set how far the camera will be from the 3D model
// camera.position.z = 350;
camera.position.z = 400;
controls.update();
// camera.position.z = 5;

function animate() {
    
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
	controls.update();
    renderer.render(scene,camera);
}
animate();



