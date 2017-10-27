import * as THREE from "three";

export default class Player {
    constructor(scene, width, height, depth, color) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
    }
    draw() {
        const playerBox = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
        );
        const playerBoxMaterial = new THREE.MeshPhongMaterial({
            color: this.color
        });

        this.cube = new THREE.Mesh(playerBox, playerBoxMaterial);
        this.cube.position.y = this.height / 2;
        this.scene.add(this.cube);
        // Точечный свет
        /* const pointLightFront = new THREE.PointLight(0xffffff);
        pointLightFront.position.set(
            this.cube.position.x + this.width / 2 + 50,
            0,
            0
        );
        const pointLightBack = new THREE.PointLight(0xffffff, 0.7);
        pointLightBack.position.set(
            this.cube.position.x - this.width / 2 - 50,
            200,
            0
        );
        // Помощник для точечного света
        const sphereSizeTop = 15;
        const pointLightHelperFront = new THREE.PointLightHelper(
            pointLightFront,
            sphereSizeTop
        );

        const sphereSizeBack = 15;
        const pointLightHelperBack = new THREE.PointLightHelper(
            pointLightBack,
            sphereSizeBack
        );

        this.scene.add(pointLightFront);
        this.scene.add(pointLightBack);
        this.scene.add(pointLightHelperFront);
        this.scene.add(pointLightHelperBack);*/
    }
    moveTo(x = 0, y = 0, z = 0) {
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
    }
    moveRight() {
        this.cube.position.x += 13;
        this.cube.rotation.z -= 0.1;
    }
    moveLeft() {
        this.cube.position.x -= 13;
        this.cube.rotation.z += 0.1;
    }
}
