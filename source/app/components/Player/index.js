import * as THREE from "three";
import { TweenMax, Power2, TimelineLite } from "gsap";

export default class Player {
    constructor(scene, map, color) {
        this.scene = scene;
        this.map = map;
        this.color = color;
        this.size = (this.map.getPlayerInfo()).size;
        this.position = (this.map.getPlayerInfo()).position;
        this.bias = this.map.getBias();
        this.mapWidth = this.map.getMapWidth();
        this.cube = null;
        this.canJump = true;
    }
    draw() {
        const playerBox = new THREE.BoxGeometry(
            this.size.width,
            this.size.height,
            this.size.length
        );

        const playerBoxMaterial = new THREE.MeshBasicMaterial({
            color: this.color
        });

        this.cube = new THREE.Mesh(playerBox, playerBoxMaterial);

        this.setPosition(this.position.x, this.position.y, this.position.z);

        this.scene.add(this.cube);
    }
    setPosition(x = 0, y = 0, z = 0) {
        let cord = this.map.getCoordinate(x, y, z);
        this.cube.position.x = cord.x;
        this.cube.position.y = cord.y;
        this.cube.position.z = cord.z;
    }
    moveLeft() {
        if (this.map.isMove()) {
            if (
                    this.position.z - 1 >= 0 &&
                    this.map.isFree(this.position.x, this.position.y, this.position.z - 1) &&
                    this.map.isFree(this.position.x + 1, this.position.y, this.position.z - 1)
                ) {
                let coord = this.map.getCoordinate(this.position.x, this.position.y, --this.position.z);
                TweenMax.to(this.cube.position, 0.5, {
                    z: coord.z,
                    ease: Power2.easeOut
                });
            }
            this.map.updatePlayerPosition(this.position.x, this.position.y, this.position.z);
        } else {
            if (this.position.z - 1 >= 0 && this.map.isFree(this.position.x, this.position.y, this.position.z - 1)) {
                let coord = this.map.getCoordinate(this.position.x, this.position.y, --this.position.z);
                TweenMax.to(this.cube.position, 0.5, {
                    z: coord.z,
                    ease: Power2.easeOut
                });
            }
            this.map.updatePlayerPosition(this.position.x, this.position.y, this.position.z);
        }
    }
    moveRight() {
        if (this.map.isMove()) {
            if (
                    this.position.z + 1 < this.mapWidth &&
                    this.map.isFree(this.position.x, this.position.y, this.position.z + 1) &&
                    this.map.isFree(this.position.x + 1, this.position.y, this.position.z + 1)
                ) {
                let coord = this.map.getCoordinate(this.position.x, this.position.y, ++this.position.z);
                TweenMax.to(this.cube.position, 0.5, {
                    z: coord.z,
                    ease: Power2.easeOut
                });
            }
            this.map.updatePlayerPosition(this.position.x, this.position.y, this.position.z);
        } else {
            if (this.position.z + 1 < this.mapWidth && this.map.isFree(this.position.x, this.position.y, this.position.z + 1)) {
                let coord = this.map.getCoordinate(this.position.x, this.position.y, ++this.position.z);
                TweenMax.to(this.cube.position, 0.5, {
                    z: coord.z,
                    ease: Power2.easeOut
                });
            }
            this.map.updatePlayerPosition(this.position.x, this.position.y, this.position.z);
        }
    }
    moveBottom() {
        let coord = this.map.getCoordinate(this.position.x, --this.position.y, this.position.z);
        TweenMax.to(this.cube.position, 0.5, {
            y: coord.y,
            ease: Power2.easeOut
        });
        this.map.updatePlayerPosition(this.position.x, this.position.y, this.position.z);
    }
    jump() {
        let coord = this.map.getCoordinate(this.position.x, this.position.y, this.position.z);
        TweenMax.to(this.cube.position, 1, {
            y: coord.y + this.size.height * 2,
            ease: Power2.easeOut
        });

        const self = this;
        let id = setInterval(function() {
            if (self.cube.position.y == coord.y + self.size.height * 2) {
                clearInterval(id);
                TweenMax.to(self.cube.position, 0.5, {
                    y: coord.y + self.size.height,
                    ease: Power2.easeOut
                });
                id = setInterval(function() {
                    if (self.cube.position.y == coord.y + self.size.height) {
                        clearInterval(id);
                        if (self.map.isJumpSuccess()) {
                            self.map.updatePlayerPosition(self.position.x, ++self.position.y, self.position.z)
                        } else {
                            TweenMax.to(self.cube.position, 0.5, {
                                y: coord.y,
                                ease: Power2.easeOut
                            });
                        }
                    } 
                });
            }
        });
        /*let angle = this.cube.rotation.z + Math.PI;
        let newPosition = this.cube.position.y + this.size.height;
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
            });*/
    }
}
