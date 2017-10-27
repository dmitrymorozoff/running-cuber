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
    }
    draw() {
        this.player = new Player(this.scene, 200, 200, 200, 0x6644ff);
        this.player.draw();
        this.player.moveTo(0, 100 + 200 / 4, 0);
        const self = this;
        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            if (keyCode == 65) {
                self.player.moveLeft(); 
            }
            if (keyCode == 68) {
                self.player.moveRight();
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
