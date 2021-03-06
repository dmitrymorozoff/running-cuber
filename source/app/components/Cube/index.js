import * as THREE from "three";

export default class Cube {
    constructor(scene, width, height, depth, x, y, z, color, type) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    draw() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
        );
        let cubeMaterial;
        if (this.type === 3) {
            cubeMaterial = new THREE.MeshBasicMaterial({
                color: this.color
            });
        } else {
            cubeMaterial = new THREE.MeshPhongMaterial({
                color: this.color,
                shading: THREE.FlatShading
            });
        }
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
        this.cube.castShadow = true;
        this.cube.receiveShadow = false;
        this.scene.add(this.cube);
    }
    move(x = 0, y = 0, z = 0) {
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
    }
}
