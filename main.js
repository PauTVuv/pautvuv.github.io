import * as THREE from "three";

var renderer, scene, camera;
var earthMesh, cloudsMesh;
var earthRotationSpeed = 0.005;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // Tierra
    var earthTexture = new THREE.TextureLoader().load('./earthmap4k.jpg');
    var earthNormal = new THREE.TextureLoader().load('./earth_normalmap_flat4k.jpg');
    var earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, normalMap: earthNormal });
    var earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);

    // Nuves
    var cloudsTexture = new THREE.TextureLoader().load('./fair_clouds_4k.png');
    var cloudsMaterial = new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true });
    var cloudsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    cloudsMesh.name = 'clouds';
    scene.add(cloudsMesh);

    // Luz
    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera
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

// Modificar la velocidad de rotación con las teclas de flecha
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

// Raycaster para hacer clic con el mouse y para la rotación
document.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        var clickedObject = intersects[0].object;
        if (clickedObject.name === 'earth' || clickedObject.name === 'clouds') {
            earthRotationSpeed = 0.0;
            console.log('Rotation stopped.');
        }
    }
}
