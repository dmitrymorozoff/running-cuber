import Player from "../Player/index.js";
import Cube from "../Cube/index.js";

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
        const self = this;
        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            console.log(keyCode);
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
