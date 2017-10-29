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
        this.mapArray = [];
        this.map = [];
        /*this.map = [
            [
                [1, 1, 1, 1, 0],
                [2, 2, 0, 0, 0],
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
            [[1, 1, 1, 1, 0], [0, 2, 2, 2, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
        ];*/
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
                color: 0xf0f0f0
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
    drawBlock(x, y, z, type) {
        if (type > 0) {
            const geometry = new THREE.BoxGeometry(
                this.style[type].width,
                this.style[type].height,
                this.style[type].length
            );
            const material = new THREE.MeshPhongMaterial({
                color: this.style[type].color,
                shading: THREE.FlatShading
            });

            this.block = new THREE.Mesh(geometry, material);

            let coord = this.getCoordinate(x, y, z, type);
            this.block.position.x = coord.x;
            this.block.position.y = coord.y;
            this.block.position.z = coord.z;

            this.block.castShadow = true;
            this.block.receiveShadow = false;

            this.mapArray.push(this.block);
            this.scene.add(this.block);
        }
    }
    generateMap() {
        const widthMap = 5;
        const heightMap = 2;
        const lengthMap = 20;
        for (let z = 0; z < widthMap; z++) {
            this.map[z] = [];
            for (let y = 0; y < heightMap; y++) {
                this.map[z][y] = [];
                for (let x = 0; x < lengthMap; x++) {
                    switch (y) {
                        case 0:
                            this.map[z][y][x] =
                                getRandomInt(0, 100) > 10 ? 1 : 0;
                            break;
                        case 1:
                            this.map[z][y][x] =
                                getRandomInt(0, 50) > 40 ? 2 : 0;
                            break;
                        default:
                            break;
                    }

                    /*
                    let typeFloor = getRandomInt(0, 100) > 10 ? 1 : 0;
                    this.drawBlock(
                        getRandomInt(0, lengthMap),
                        0,
                        getRandomInt(0, widthMap + 1),
                        typeFloor
                    );
                    let typeBlock = getRandomInt(0, 50) > 40 ? 2 : 0;
                    this.drawBlock(
                        getRandomInt(0, lengthMap),
                        getRandomInt(1, heightMap),
                        getRandomInt(0, widthMap + 1),
                        typeBlock
                    );*/
                }
            }
        }
        console.log(this.map);
    }
    getCoordinate(x, y, z, type = null) {
        let size = this.size;
        return {
            x: this.bias.x + x * size + size / 2,
            y:
                this.bias.y +
                y * size +
                (type == 1 ? (size - this.style[type].height) / 2 : 0),
            z: this.bias.z + z * size + size / 2
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
        if (!this.map[z][y][x]) {
            return true;
        }
        return false;
    }
    isMove() {
        if (this.distancce != 0) {
            return true;
        }
        return false;
    }
    isJumpSuccess() {
        let playerPosX = this.playerInfo.position.x;
        let playerPosY = this.playerInfo.position.y;
        let playerPosZ = this.playerInfo.position.z;
        if (
            this.distancce <= 100 &&
            playerPosX + 1 < this.map[playerPosZ][playerPosY].length
        ) {
            return true;
        }
        return false;
    }
    addPlayer(player) {
        this.player = player;
    }
    restartMap() {
        for (let i = 0; i < this.scene.children.length; i++) {
            if (this.scene.children[i].type === "Mesh") {
                this.scene.remove(this.scene.children[i]);
            }
        }
        console.log(this.scene);
        this.mapArray.length = 0;
        this.draw();
        this.updatePlayerPosition(0, 1, 3);
        this.player.draw();
    }
    move() {
        let playerPosX = this.playerInfo.position.x;
        let playerPosY = this.playerInfo.position.y;
        let playerPosZ = this.playerInfo.position.z;
        if (
            playerPosX + 1 < this.map[playerPosZ][playerPosY].length &&
            this.map[playerPosZ][playerPosY][playerPosX + 1] > 0
        ) {
            // this.restartMap();
            console.log("лузыч");
        }

        if (this.distancce == this.size) {
            this.distancce -= 200;
            this.updatePlayerPosition(++playerPosX, playerPosY, playerPosZ);
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
}
