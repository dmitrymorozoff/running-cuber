import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import Scene from "./components/Scene/index.js";

export default class Game {
    start() {
        let animationId;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 1000;
        camera.position.y = 1000;
        camera.position.x = -850;
        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);

        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(500, 1000, 500);
        scene.add(pointLight);

        const sphereSize = 15;
        const pointLightHelper = new THREE.PointLightHelper(
            pointLight,
            sphereSize
        );
        scene.add(pointLightHelper);

        var size = 800;
        var divisions = 50;

        var gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1);
        document.body.appendChild(renderer.domElement);

        const gameScene = new Scene(scene, pointLight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        function resize() {
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        }
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}
