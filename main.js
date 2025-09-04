import { Game } from "./game.js";
import { ResponsiveCanvas } from "./responsiveCanvas.js";

const container = document.getElementById("game-container");
const canvas = document.getElementById("game");
const music = document.getElementById("bg-music");

const responsiveCanvas = new ResponsiveCanvas(container, canvas);

let game;

function initGame(width, height) {
  if (!game) {
    game = new Game(responsiveCanvas.ctx, width, height);
    animate(); // start animation loop once game is created
  } else {
    game.resize(width, height);
  }
}

// Set resize handler to initialize or resize the game
responsiveCanvas.setResizeHandler(initGame);

// Trigger initial resize (and game creation)
responsiveCanvas.resize();

function animate() {
  if (!game) return; // safety check
  game.update();
  game.draw();
  requestAnimationFrame(animate);
}
