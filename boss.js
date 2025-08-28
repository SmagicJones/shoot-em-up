import { Enemy } from "./enemy.js";

export class Boss extends Enemy {
  constructor(
    x,
    y,
    width = 100,
    height = 100,
    speed = 1.5,
    health = 10,
    imageUrl = null,
    projectileColour = "purple",
    shootCoolDown = 500
  ) {
    super(x, y, width, height, speed, imageUrl);

    this.health = health;
    this.maxHealth = health;

    // Movement pattern settings
    this.direction = 1; // 1 = down, -1 = up
    this.verticalRange = 100; // How far up/down it moves
    this.startY = y;

    // Projectiles
    this.projectiles = [];
    this.shootCooldown = shootCoolDown; // frames between shots
    this.shootTimer = 0;
    this.projectileColour = projectileColour; // Colour of the projectiles
  }

  update() {
    // Horizontal movement (like Enemy)
    this.x -= this.speed;

    // Vertical oscillation
    this.y += this.direction * 1.5;
    if (
      this.y > this.startY + this.verticalRange ||
      this.y < this.startY - this.verticalRange
    ) {
      this.direction *= -1;
    }

    // Shooting
    this.shootTimer++;
    if (this.shootTimer >= this.shootCooldown) {
      this.shoot();
      this.shootTimer = 0;
    }

    // Update projectiles
    this.projectiles.forEach((p) => p.update());
  }

  draw(ctx) {
    // Draw the boss image
    super.draw(ctx);

    // Draw health bar
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y - 10, this.width, 5);
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x,
      this.y - 10,
      (this.width * this.health) / this.maxHealth,
      5
    );

    // Draw projectiles
    this.projectiles.forEach((p) => p.draw(ctx));
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isDead = true;
    }
  }

  shoot() {
    this.projectiles.push(
      new BossProjectile(
        this.x,
        this.y + this.height / 2,
        10,
        20,
        this.projectileColour
      )
    );
  }
}

// Simple projectile for the boss
class BossProjectile {
  constructor(x, y, speed = 1, size = 10, projectileColour = "purple") {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.projectileColour = projectileColour;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.projectileColour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
