import * as THREE from "three";

export default class Player {
    constructor(scene, width, height, depth, color) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
    }
    draw() {
        const playerBox = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
        );
        const playerBoxMaterial = new THREE.MeshLambertMaterial({
            color: this.color
        });
        const playerBoxMesh = new THREE.Mesh(playerBox, playerBoxMaterial);
        this.scene.add(playerBoxMesh);
    }
}
