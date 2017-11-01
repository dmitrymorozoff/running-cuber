import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";
import Cube from "../Cube/index.js";

const BLOCK_SIZE = 200;

export default class Map {
    constructor(scene, x = 0, y = 0, z = 0, scale = 1) {
        this.scene = scene;
        this.size = BLOCK_SIZE * scale;
        this.bias = {
            x: x,
            y: y + -(this.size / 2),
            z: z
        };
        this.mapArray = [];
        this.map = [];
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
                colors: [0xb0b3b7, 0xebedf2, 0xb7babe]
            },
            "2": {
                width: this.size,
                height: this.size,
                length: this.size,
                colors: [0xb0b3b7, 0xebedf2, 0xb7babe]
            },
            "3": {
                width: this.size / 4,
                height: this.size / 4,
                length: this.size / 4,
                colors: [0x76ff03, 0xff1744, 0x651fff]
            }
        };
        this.distance = 0;
        this.speed = this.size / 25;
        this.player = null;
        this.widthMap = 5;
        this.heightMap = 4;
        this.lengthMap = 20;
        this.startBarrierFrom = 4;
        this.startHoleFrom = 3;
    }
    draw(begin, end) {
        for (let z = 0; z < this.map.length; z++) {
            for (let y = 0; y < this.map[z].length; y++) {
                for (let x = begin; x < end; x++) {
                    if (this.map[z][y][x] > 0) {
                        /*this.drawBlock(x, y, z, this.map[z][y][x]);*/
                        let type = this.map[z][y][x];
                        let coord = this.getCoordinate(x, y, z, type);

                        let color = this.style[type].colors[
                            getRandomInt(0, this.style[type].colors.length)
                        ];
                        let cube = new Cube(
                            this.scene,
                            this.style[type].width,
                            this.style[type].height,
                            this.style[type].length,
                            coord.x,
                            coord.y,
                            coord.z,
                            color,
                            type
                        );
                        this.mapArray.push(cube);
                        cube.draw();
                    }
                }
            }
        }
    }
    generateMap() {
        for (let z = 0; z < this.widthMap; z++) {
            this.map[z] = [];
            for (let y = 0; y < this.heightMap; y++) {
                this.map[z][y] = [];
                for (let x = 0; x < this.lengthMap; x++) {
                    switch (y) {
                        case 0:
                            if (x >= this.startHoleFrom) {
                                this.map[z][y][x] =
                                    getRandomInt(0, 100) > 10 ? 1 : 0;
                            } else {
                                this.map[z][y][x] = 1;
                            }
                            break;
                        case 1:
                            if (x >= this.startBarrierFrom) {
                                this.map[z][y][x] =
                                    getRandomInt(0, 50) > 40
                                        ? getRandomInt(2, 4)
                                        : 0;
                            } else {
                                this.map[z][y][x] = 0;
                            }
                            break;
                        case 2:
                            this.map[z][y][x] = 0;
                            break;
                        case 3:
                            this.map[z][y][x] =
                                getRandomInt(0, 150) > 140 ? 2 : 0;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    removeFirstLine() {
        for (let i = 0; i < this.mapArray.length; i++) {
            if (this.mapArray[i].cube.position.x < 0) {
                this.scene.remove(this.mapArray[i].cube);
            }
        }
    }
    addNewLine() {
        const widthMap = 5;
        const heightMap = 4;
        const lengthMap = 20;
        for (let z = 0; z < widthMap; z++) {
            this.map[z] = [];
            for (let y = 0; y < heightMap; y++) {
                this.map[z][y] = [];
                for (let x = lengthMap - 1; x < lengthMap; x++) {
                    switch (y) {
                        case 0:
                            this.map[z][y][x] =
                                getRandomInt(0, 100) > 10 ? 1 : 0;
                            break;
                        case 1:
                            this.map[z][y][x] =
                                getRandomInt(0, 50) > 40
                                    ? getRandomInt(2, 4)
                                    : 0;
                            break;
                        case 2:
                            this.map[z][y][x] = 0;
                            break;
                        case 3:
                            this.map[z][y][x] =
                                getRandomInt(0, 150) > 140 ? 2 : 0;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        this.draw(this.lengthMap - 1, this.lengthMap);
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
    isJumpSuccess() {
        let playerPosX = this.playerInfo.position.x;
        let playerPosY = this.playerInfo.position.y;
        let playerPosZ = this.playerInfo.position.z;
        if (
            this.distance <= 100 &&
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
        for (let i = 0; i < this.mapArray.length; i++) {
            this.scene.remove(this.mapArray[i]);
        }
        this.mapArray.length = 0;
        this.draw(0, this.lengthMap);
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
            console.log("gameover");
        }

        if (this.distance == this.size) {
            this.distance -= 200;
            this.updatePlayerPosition(++playerPosX, playerPosY, playerPosZ);
            this.removeFirstLine();
            this.addNewLine();
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
            this.mapArray[i].cube.position.x -= this.speed;
        }

        this.distance += this.speed;
    }
}
