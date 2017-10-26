import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        document.querySelector("canvas").remove();
        renderer.forceContextLoss();
        renderer.context = null;
        renderer.domElement = null;
        renderer = null;
        cancelAnimationFrame(animationId);
        removeEventListener("resize", resize);
    });
}

let scene, camera, renderer, animationId, controls;
let geometry, material, mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );

    camera.position.z = 1000;
    controls = new OrbitControls(camera);
    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshLambertMaterial({
        color: 0x6644ff
    });

    const axisHelper = new THREE.AxisHelper(1000);
    scene.add(axisHelper);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const box = new THREE.BoxGeometry(200, 200, 200);
    const boxMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        wireframe: true
    });
    const boxMesh = new THREE.Mesh(box, boxMaterial);
    scene.add(boxMesh);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(500, 1000, 500);
    scene.add(pointLight);

    const sphereSize = 15;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    scene.add(pointLightHelper);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    mesh.rotation.x += 0.04;
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}

init();
animate();

function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}

addEventListener("resize", resize);
