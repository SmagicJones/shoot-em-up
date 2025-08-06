export class Enemy {
  constructor(x, y, width = 40, height = 40, speed = 3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "red"; // Enemy color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isCollidingWith(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    );
  }
}
