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
        let newPosition = this.cube.position.z + this.width;
        TweenMax.to(this.cube.position, 0.5, {
            z: newPosition,
            ease: Power2.easeOut
        });
    }
    moveLeft() {
        let newPosition = this.cube.position.z - this.width;
        TweenMax.to(this.cube.position, 0.5, {
            z: newPosition,
            ease: Power2.easeOut
        });
    }
    jump() {
        let angle = this.cube.rotation.z + Math.PI;
        let newPosition = this.cube.position.y + this.height;
        let newPosition2 = 175;
        var tl = new TimelineMax();
        TweenMax.to(this.cube.rotation, 1, {
            z: angle,
            ease: Power2.easeOut
        });
        tl
            .to(this.cube.position, 0.5, {
                y: newPosition,
                ease: Power2.easeOut
            })
            .to(this.cube.position, 0.3, {
                y: newPosition2,
                ease: Power2.easeOut
            });
    }
}
