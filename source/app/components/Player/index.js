import * as THREE from "three";
import { TweenMax, Power2, TimelineLite } from "gsap";
export default class Player {
    constructor(scene, width, height, depth, color) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
        this.canJump = true;
    }
    draw() {
        const playerBox = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
        );

        const playerBoxMaterial = new THREE.MeshBasicMaterial({
            color: this.color
        });

        this.cube = new THREE.Mesh(playerBox, playerBoxMaterial);
        this.cube.position.y = this.height / 2;
        this.scene.add(this.cube);
    }
    moveTo(x = 0, y = 0, z = 0) {
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
    }
    moveRight() {
        this.cube.position.z += this.width;
    }
    moveLeft() {
        this.cube.position.z -= this.width;
    }
    jump() {
        this.canJump = false;
    }
}
