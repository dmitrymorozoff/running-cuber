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
        this.map.draw();

        this.player = new Player(this.scene, this.map, 0x2f94ff);
    	this.player.draw();

    	this.map.addPlayer(this.player);

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
