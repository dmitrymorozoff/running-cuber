import Player from "../Player/index.js";
import Cube from "../Cube/index.js";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
    }
    draw() {
        const player = new Player(this.scene, 200, 200, 200, 0x6644ff);
        player.draw();

        const cube1 = new Cube(this.scene, 200, 800, 200, 0x6644ff);
        cube1.draw();
        cube1.move(500);
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
