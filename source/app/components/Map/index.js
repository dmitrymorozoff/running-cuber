import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

const SIZE = 200;

export default class Map {
    constructor(scene, x = 0, y = 0, z = 0, scale = 1) {
        this.scene = scene;
        this.size = SIZE * scale;
        this.bias = {
            x: x,
            y: y + -(this.size / 2),
            z: z
        };
        (this.mapArray = []),
            (this.map = [
                [
                    [1, 1, 1, 1, 0],
                    [2, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                [
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                [
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                [
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                [
                    [1, 1, 1, 1, 0],
                    [0, 2, 2, 2, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ]
            ]);
        this.playerInfo = {
            position: {
                x: 0,
                y: 1,
                z: 3
            },
            size: {
                width: this.size,
                height: this.size,
                length: this.size
            }
        };
        this.style = {
            "1": {
                width: this.size,
                height: this.size / 2,
                length: this.size,
                color: 0x3012050
            },
            "2": {
                width: this.size,
                height: this.size,
                length: this.size,
                color: 0xf0f0f0
            }
        };
        this.distancce = 0;
        this.movePerTick = this.size / 100;
        this.player = null;
    }
    draw() {
        for (let z = 0; z < this.map.length; z++) {
            for (let y = 0; y < this.map[z].length; y++) {
                for (let x = 0; x < this.map[z][y].length; x++) {
                    if (this.map[z][y][x] > 0) {
                        this.drawBlock(x, y, z, this.map[z][y][x]);
                    }
                }
            }
        }
    }
    drawBlock(x, y, z, index) {
        const geometry = new THREE.BoxGeometry(
            this.style[index].width,
            this.style[index].height,
            this.style[index].length
        );
        const material = new THREE.MeshPhongMaterial({
            color: this.style[index].color,
            shading: THREE.FlatShading
        });

        this.block = new THREE.Mesh(geometry, material);

        let coord = this.getCoordinate(x, y, z, index);
        this.block.position.x = coord.x;
        this.block.position.y = coord.y;
        this.block.position.z = coord.z;

        this.block.castShadow = true;
        this.block.receiveShadow = false;

        this.mapArray.push(this.block);
        this.scene.add(this.block);
    }
    getCoordinate(x, y, z, index = null) {
        return {
            x: this.bias.x + x * this.size + this.size / 2,
            y:
                this.bias.y +
                y * this.size +
                (index == 1 ? (this.size - this.style[index].height) / 2 : 0),
            z: this.bias.z + z * this.size + this.size / 2
        };
    }
    getPlayerInfo() {
        return this.playerInfo;
    }
    updatePlayerPosition(x, y, z) {
        this.playerInfo.position.x = x;
        this.playerInfo.position.y = y;
        this.playerInfo.position.z = z;
    }
    getMap() {
        return this.map;
    }
    getMapWidth() {
        return this.map.length;
    }
    getBias() {
        return this.bias;
    }
    isFree(x, y, z) {
        if (!this.map[z][y][x]) return true;
        return false;
    }
    isMove() {
        if (this.distancce != 0) return true;
        return false;
    }
    isJumpSuccess() {
        if (
            this.distancce <= 100 &&
            this.playerInfo.position.x + 1 <
                this.map[this.playerInfo.position.z][this.playerInfo.position.y]
                    .length
        )
            return true;
        return false;
    }
    move() {
        if (
            this.playerInfo.position.x + 1 <
                this.map[this.playerInfo.position.z][this.playerInfo.position.y]
                    .length &&
            this.map[this.playerInfo.position.z][this.playerInfo.position.y][
                this.playerInfo.position.x + 1
            ] > 0
        ) {
            console.log("лузыч");
        }

        if (this.distancce == this.size) {
            this.distancce -= 200;
            this.updatePlayerPosition(
                ++this.playerInfo.position.x,
                this.playerInfo.position.y,
                this.playerInfo.position.z
            );
        }

        while (
            this.playerInfo.position.y - 1 >= 0 &&
            this.map[this.playerInfo.position.z][
                this.playerInfo.position.y - 1
            ][this.playerInfo.position.x] === 0
        ) {
            this.player.moveBottom();
        }

        for (let i = 0; i < this.mapArray.length; i++) {
            this.mapArray[i].position.x -= this.movePerTick;
        }

        this.distancce += this.movePerTick;
    }
    addPlayer(player) {
        this.player = player;
    }
}
