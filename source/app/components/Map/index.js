import * as THREE from "three";

export default class Map {
    constructor(scene, x, y, z, color, size) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.size = size;
        this.map = this.map = [
            [
                [1, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0, 0],
                [1, 2, 2, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0, 0],
                [1, 2, 2, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0, 0],
                [1, 2, 0, 2, 0, 0, 0, 0],
                [1, 2, 0, 2, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 0, 0, 0],
                [3, 3, 3, 3, 3, 3, 3],
                [0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 0, 0, 0]
            ],
            [
                [3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3],
                [3, 0, 3, 0, 3, 3, 3],
                [3, 3, 3, 3, 3, 3, 3]
            ]
        ];
    }
    draw() {
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                for (let z = 0; z < this.map[x][y].length; z++) {
                    switch (this.map[x][y][z]) {
                        // Пол
                        case 1:
                            this.drawBlock(
                                this.size,
                                this.size / 4,
                                this.size,
                                y,
                                z,
                                x
                            );
                            break;
                        // Барьеры
                        case 2:
                            this.drawBlock(
                                this.size,
                                this.size,
                                this.size,
                                y,
                                z / 2,
                                x
                            );
                            // this.drawBlock(y,z,x);
                            break;
                        case 3:
                            // this.drawBlock(x + 2, y, z);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    drawBlock(width, height, depth, x, y, z) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshLambertMaterial({
            color: this.color,
            shading: THREE.FlatShading
        });

        this.block = new THREE.Mesh(geometry, material);
        this.block.position.x = this.x + x * this.size;
        this.block.position.y = this.y + y * this.size;
        this.block.position.z = this.z + z * this.size;
        this.block.castShadow = true;
        this.block.receiveShadow = false;
        this.scene.add(this.block);
    }
}
