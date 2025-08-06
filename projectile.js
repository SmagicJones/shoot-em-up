// projectile.js
export class Projectile {
  constructor(x, y, radius = 10, speed = 10) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  update() {
    this.x += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
