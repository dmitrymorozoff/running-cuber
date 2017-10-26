import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import Game from "./app/index.js";

// if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => {
//         document.querySelector("canvas").remove();
//         renderer.forceContextLoss();
//         renderer.context = null;
//         renderer.domElement = null;
//         renderer = null;
//         cancelAnimationFrame(animationId);
//         removeEventListener("resize", resize);
//     });
// }

const gameSettings = {
    camera: {
        x: -1000,
        y: 1000,
        z: 1000
    }
};

const game = new Game(gameSettings);
game.start();
