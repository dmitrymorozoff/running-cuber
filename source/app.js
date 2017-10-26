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

const game = new Game();
game.start();
