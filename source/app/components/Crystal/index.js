import * as THREE from "three";

export default class Crystal {
    constructor(scene, radius, detail, x, y, z, color) {
        this.scene = scene;
        this.radius = radius;
        this.detail = detail;
        this.color = color;
        this.crystal = null;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    draw() {
        const crystalGeometry = new THREE.OctahedronBufferGeometry(
            this.radius,
            this.detail
        );
        let crystalMaterial;
        if (this.type === 3) {
            crystalMaterial = new THREE.MeshBasicMaterial({
                color: this.color
            });
        } else {
            crystalMaterial = new THREE.MeshPhongMaterial({
                color: this.color,
                shading: THREE.FlatShading
            });
        }
        this.crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        this.crystal.position.x = this.x;
        this.crystal.position.y = this.y;
        this.crystal.position.z = this.z;
        this.crystal.castShadow = true;
        this.crystal.receiveShadow = false;
        this.scene.add(this.crystal);
    }
}
