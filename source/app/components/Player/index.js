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
        
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(100, 0, 0);
        const sphereSize = 15;
        const pointLightHelper = new THREE.PointLightHelper(
            pointLight,
            sphereSize
        );
        this.scene.add(pointLight);
        this.scene.add(pointLightHelper);
 
        console.log(this.scene);

        const playerBoxMaterial = new THREE.MeshLambertMaterial({
            color: this.color
        });
        const playerBoxMesh = new THREE.Mesh(playerBox, playerBoxMaterial);
        this.scene.add(playerBoxMesh);
    }
}
