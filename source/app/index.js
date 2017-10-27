import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import Scene from "./components/Scene/index.js";
import Map from "./components/Map/index.js";
import getRandomInt from "../utils/index.js";

export default class Game {
    constructor(settings) {
        this.settings = settings;
    }
    start() {
        let animationId;
        const scene = new THREE.Scene();
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 3200;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            10000
        );
        camera.position.y = 400;
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0x111111));

        // Хуйня которая вертить камеру
        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        // Вспомогательные оси
        const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);

        // Вершшхний свет
        var shadowlight = new THREE.DirectionalLight(0xffffff, 0.3);
        shadowlight.position.set(0, 100, 0);
        shadowlight.castShadow = true;
        shadowlight.shadowDarkness = 0.1;
        scene.add(shadowlight);

        var light = new THREE.DirectionalLight(0xffffff, 0.6);
        light.position.set(-60, 100, 20);
        scene.add(light);

        var backLight = new THREE.DirectionalLight(0x777777, 0.45);
        backLight.position.set(-10, 100, 60);
        scene.add(backLight);

        /*var geometry = new THREE.PlaneGeometry(10000, 10000, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x202020 });
        const floor = new THREE.Mesh(geometry, material);
        floor.material.side = THREE.DoubleSide;
        floor.position.y = -550;
        floor.position.x = -100;
        floor.rotation.x = 90 * Math.PI / 180;
        floor.rotation.y = 0;
        floor.rotation.z = 0;
        floor.doubleSided = true;
        floor.receiveShadow = true;
        scene.add(floor);*/

        const particleMaterial = new THREE.PointCloudMaterial({
            color: 0xffffcc
        });
        const particleGeometry = new THREE.Geometry();
        let x, y, z;
        for (let i = 0; i < 500; i++) {
            x = getRandomInt(-5000, 5000);
            y = getRandomInt(-5000, 5000);
            z = getRandomInt(-5000, 5000);
            particleGeometry.vertices.push(new THREE.Vector3(x, y, z));
        }
        const pointCloud = new THREE.PointCloud(
            particleGeometry,
            particleMaterial
        );
        scene.add(pointCloud);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x101010, 1);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        const gameScene = new Scene(scene, shadowlight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        const heightFloor = 200 / 4;
        const map = new Map(scene, 0, heightFloor / 2, -400, 0xbfc2c7, 200);
        map.draw();

        function resize() {
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        }
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}
