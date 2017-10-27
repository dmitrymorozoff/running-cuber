import Player from "../Player/index.js";
import Cube from "../Cube/index.js";
import { TweenMax } from "gsap";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
        this.player = null;
        this.flag = true;
    }
    draw() {
        this.player = new Player(this.scene, 200, 200, 200, 0x6644ff);
        this.player.draw();
        this.player.moveTo(0, 200 - 25, 0);
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
        let tick = 175;

        if (this.player.canJump === false) {
            tick += 5;
            if (
                this.player.cube.position.y > 15 &&
                tick < 375 &&
                this.flag === true
            ) {
                this.player.cube.position.y += 13;
            }
            if (this.player.cube.position.y >= 375) {
                this.flag = false;
            }
            if (this.player.cube.position.y > 175 && this.flag === false) {
                tick *= -1;
                this.player.cube.position.y -= 13;
            }

            if (this.player.cube.position.y === 175) {
                this.player.canJump = true;
                this.flag = true;
            }
        }

        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
