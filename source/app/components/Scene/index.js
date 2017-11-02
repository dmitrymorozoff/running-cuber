import * as THREE from "three";
import Player from "../Player/index.js";
import Map from "../Map/index.js";
import { TweenMax } from "gsap";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
        this.player = null;
        this.map = null;
    }
    draw() {
        this.map = new Map(this.scene);
        this.map.generateMap();
        const lengthMap = 20;
        this.map.draw(0, lengthMap);

        this.player = new Player(this.scene, this.map, 0xf50057);
        this.player.draw();

        this.map.addPlayer(this.player);
        const playerPosition = this.map.playerInfo.position;
        const playerCoordinate = this.map.getCoordinate(
            playerPosition.x,
            playerPosition.y,
            playerPosition.z
        );

        console.log(playerCoordinate);

        var light = new THREE.PointLight(0xffffff, 1.5, 1600);
        light.position.set(
            playerCoordinate.x,
            playerCoordinate.y + 400,
            playerCoordinate.z
        );
        this.scene.add(light);

        const self = this;
        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            if (keyCode == 65) {
                self.player.moveLeft();
            }
            if (keyCode == 68) {
                self.player.moveRight();
            }
            if (keyCode == 32) {
                self.player.jump();
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.map.move();
    }
}
