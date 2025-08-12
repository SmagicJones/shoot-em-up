import { clamp } from "./clamp.js";

export class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5; // Player speed
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
    // old way - this is just an orange triangle

    // ctx.fillStyle = "orange";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    // new way - attempting to make a spaceship

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Center the spaceship

    ctx.beginPath();
    ctx.moveTo(this.width / 2, 0); // Nose tip (right)
    ctx.lineTo(-this.width / 2, -this.height / 2); // Top back corner
    ctx.lineTo(-this.width / 2, this.height / 2); // Bottom back corner
    ctx.closePath();

    ctx.fillStyle = "silver";
    ctx.fill();

    ctx.strokeStyle = "black"; // Outline color
    ctx.lineWidth = 2; // Outline width
    ctx.stroke();

    // cockpit

    ctx.beginPath();
    ctx.arc(0, 0, this.width / 6, 0, Math.PI * 2); // Draw a circle for the cockpit
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}
