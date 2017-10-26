import * as THREE from "three";

export default class Map {
    constructor(scene, x, y, z, color, size) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.size = size;
        this.map = [
            [
                [1, 1, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
        ];
    }
    draw() {
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                for (let z = 0; z < this.map[x][y].length; z++) {
                    if (this.map[x][y][z] == 1) {
                        this.drawBlock(x, y, z);
                    }
                }
            }
        }
    }
    drawBlock(x, y, z) {
        const size = new THREE.BoxGeometry(this.size, this.size, this.size);
        const material = new THREE.MeshLambertMaterial({
            color: this.color
        });

        this.block = new THREE.Mesh(size, material);
        this.block.position.x = this.x + x * this.size;
        this.block.position.y = this.y + y * this.size;
        this.block.position.z = this.z + z * this.size;

        this.scene.add(this.block);
    }
}
