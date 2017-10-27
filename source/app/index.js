import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import Scene from "./components/Scene/index.js";
import Map from "./components/Map/index.js";

export default class Game {
    constructor(settings) {
        this.settings = settings;
    }
    start() {
        let animationId;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        // Хуйня которая вертить камеру
        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        // Вспомогательные оси
        const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);
        // Вершшхний свет
        var shadowlight = new THREE.DirectionalLight(0xffffff, 0.1);
        shadowlight.position.set(-50, 50, 50);
        shadowlight.castShadow = true;
        shadowlight.shadowDarkness = 0.1;
        scene.add(shadowlight);
        /*const sphereSize = 15;
        const pointLightHelper = new THREE.PointLightHelper(
            pointLight,
            sphereSize
        );
        scene.add(pointLightHelper);*/
        // Передний свет
        var light = new THREE.DirectionalLight(0xffffff, 0.2);
        light.position.set(60, 100, 20);
        scene.add(light);
        //Задний свет
        var backLight = new THREE.DirectionalLight(0xf2f2f2, 1);
        backLight.position.set(-40, 100, 20);
        scene.add(backLight);
        // Сетка
        /*var size = 800;
        var divisions = 50;
        var gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);*/

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x111111, 1);
        document.body.appendChild(renderer.domElement);

        const gameScene = new Scene(scene, shadowlight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        const heightFloor = 200 / 4;
        const map = new Map(scene, 0, heightFloor / 2, 0, 0xf9f8ed, 200);
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
