import * as THREE from "three";

var renderer, scene, camera;
var earthMesh, cloudsMesh;
var earthRotationSpeed = 0.005;

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	// Fondo

	// tierra
	var earthTexture = new THREE.TextureLoader().load('./earthmap4k.jpg');
	var earthNormal = new THREE.TextureLoader().load('./earth_normalmap_flat4k.jpg');
	var earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, normalMap: earthNormal });
	var earthGeometry = new THREE.SphereGeometry(1, 32, 32);
	earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
	earthMesh.name = 'earth';
	scene.add(earthMesh);

	// nubes
	var cloudsTexture = new THREE.TextureLoader().load('./fair_clouds_4k.png');
	var cloudsMaterial = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
	var cloudsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
	cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
	scene.add(cloudsMesh);

	// luz
	var pointLight = new THREE.PointLight(0xffffff, 1);
	pointLight.position.set(5, 5, 5);
	scene.add(pointLight);

	// camara
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 3;
	camera.lookAt(scene.position);
}

function animate() {
	requestAnimationFrame(animate);
	render();
	earthMesh.rotation.y += earthRotationSpeed;
	cloudsMesh.rotation.y += earthRotationSpeed * 1.2;
}

function render() {
	renderer.render(scene, camera);
}

// modificar velocidad de rotacion
document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37: // flecha izquierda
			earthRotationSpeed -= 0.0001;
			break;
		case 39: // flecha derecha
			earthRotationSpeed += 0.0001;
			break;
	}
});