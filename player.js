import { clamp } from "./clamp.js";

export class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 100; // Player speed
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveDown() {
    this.y += this.speed; // Move down by speed
  }

  moveUp() {
    this.y -= this.speed; // Move up by speed
  }

  clampPosition(minX, minY, maxX, maxY) {
    this.x = clamp(this.x, minX, maxX - this.width);
    this.y = clamp(this.y, minY, maxY - this.height);
  }

  jump() {
    // Implement jump logic
  }

  update() {
    // Update player position and state
  }

  draw(ctx) {
    ctx.fillStyle = "orange"; // Player color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
