import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

import { Enemy } from "./enemy.js"; // Assuming you have an Enemy class
import { Boss } from "./boss.js";

export class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    // Initialize player, enemies, etc.
    this.player = new Player(100, 100, 50, 50);
    this.projectiles = [];
    this.enemies = []; // Initialize enemies array
    this.isGameOver = false;
    this.score = 0; // Initialize score
    this.keys = {};

    setInterval(() => {
      if (!this.isGameOver) {
        // Add a new enemy every 2 seconds
        const enemyX = this.width; // Start at the right edge of the canvas
        const enemyY = Math.random() * (this.height - 40); // Random vertical position

        const randomWidth = 50 + Math.random() * 100;
        const randomHeight = 50 + Math.random() * 100;

        this.enemies.push(
          new Enemy(
            enemyX,
            enemyY,
            randomWidth,
            randomHeight,
            3,
            "https://www.pngarts.com/files/10/Boulder-PNG-Pic.png"
          )
        );
      }
    }, 2000);

    setInterval(() => {
      if (!this.isGameOver) {
        // Spawn a boss every 30 seconds (for testing)
        const bossX = this.width;
        const bossY = this.height / 2 - 50; // Start near middle

        this.enemies.push(
          new Boss(
            bossX,
            bossY,
            100,
            100,
            1.5,
            20,
            "https://www.pngarts.com/files/10/Boulder-PNG-Pic.png"
          )
        );
      }
    }, 3000);

    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true; // <-- You need this!
      if (event.key === "f") {
        this.fireProjectile();
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  fireProjectile() {
    const x = this.player.x + this.player.width; // Start projectile at player's right edge
    const y = this.player.y + this.player.height / 2; // Center vertically
    this.projectiles.push(new Projectile(x, y));
  }

  // update() {
  //   // Update game state (player position, physics)
  //   if (this.isGameOver) return;
  //   this.player.clampPosition(0, 0, this.width, this.height); // Clamp player position to canvas bounds

  //   if (this.keys["ArrowUp"]) {
  //     this.player.moveUp(); // Move player up
  //   }
  //   if (this.keys["ArrowDown"]) {
  //     this.player.moveDown(); // Move player down
  //   }
  //   if (this.keys["ArrowLeft"]) {
  //     this.player.moveLeft(); // Move player left
  //   }
  //   if (this.keys["ArrowRight"]) {
  //     this.player.moveRight(); // Move player right
  //   }
  //   this.projectiles.forEach((projectile) => projectile.update());
  //   this.projectiles = this.projectiles.filter(
  //     (projectile) => projectile.x < this.width // Remove off-screen projectiles
  //   );
  //   this.enemies.forEach((enemy) => enemy.update());
  //   this.enemies = this.enemies.filter(
  //     (enemy) => enemy.x + enemy.width > 0 // Remove off-screen enemies
  //   );

  //   for (const enemy of this.enemies) {
  //     if (enemy.isCollidingWith(this.player)) {
  //       this.isGameOver = true; // End game on collision
  //       break; // Exit loop on collision
  //     }
  //   }

  //   if (this.enemies.some((enemy) => enemy.x <= 0)) {
  //     this.isGameOver = true; // End game if any enemy reaches the left edge
  //   }
  // }

  update() {
    if (this.isGameOver) return;

    // 1️⃣ Player movement
    this.player.clampPosition(0, 0, this.width, this.height);
    if (this.keys["ArrowUp"]) this.player.moveUp();
    if (this.keys["ArrowDown"]) this.player.moveDown();
    if (this.keys["ArrowLeft"]) this.player.moveLeft();
    if (this.keys["ArrowRight"]) this.player.moveRight();

    // 2️⃣ Update player projectiles
    this.projectiles.forEach((p) => p.update());
    this.projectiles = this.projectiles.filter((p) => p.x < this.width);

    // 3️⃣ Update enemies
    this.enemies.forEach((e) => e.update());
    this.enemies = this.enemies.filter((e) => e.x + e.width > 0);

    // 4️⃣ Boss projectiles hitting the player
    for (const enemy of this.enemies) {
      if (enemy instanceof Boss) {
        for (const bossProj of enemy.projectiles) {
          const distX = Math.abs(
            bossProj.x - (this.player.x + this.player.width / 2)
          );
          const distY = Math.abs(
            bossProj.y - (this.player.y + this.player.height / 2)
          );
          const combinedHalfWidths = this.player.width / 2 + bossProj.size;
          const combinedHalfHeights = this.player.height / 2 + bossProj.size;

          if (distX < combinedHalfWidths && distY < combinedHalfHeights) {
            this.isGameOver = true; // Player hit

            // Remove projectile
            const index = enemy.projectiles.indexOf(bossProj);
            if (index > -1) enemy.projectiles.splice(index, 1);

            break;
          }
        }
      }
    }

    // 5️⃣ Enemy → player collisions
    for (const enemy of this.enemies) {
      if (enemy.isCollidingWith(this.player)) {
        this.isGameOver = true;
        break;
      }
    }

    // 6️⃣ Enemies reaching left edge
    if (this.enemies.some((enemy) => enemy.x <= 0)) {
      this.isGameOver = true;
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    // Draw your game elements here

    // I think I'm going to start with the css background first see #game in styles.css

    // ctx.fillStyle = "black";

    // ctx.fillRect(0, 0, this.width, this.height);

    this.player.draw(ctx); // Draw the player
    // Draw projectiles and enemies
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx); // Draw each projectile
    });

    this.enemies.forEach((enemy) => {
      enemy.draw(ctx); // Draw each enemy
    });
    // remove off screen enemies
    this.enemies = this.enemies.filter((enemy) => enemy.x + enemy.width > 0);
    // remove off screen projectiles
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.x < this.width
    );

    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Score: ${this.score}`, 10, 30); // Display

    // Check for projectile-enemy collisions
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const projectile = this.projectiles[i];
        const enemy = this.enemies[j];

        // Simple rectangle-circle collision approximation:
        const distX = Math.abs(projectile.x - (enemy.x + enemy.width / 2));
        const distY = Math.abs(projectile.y - (enemy.y + enemy.height / 2));
        const combinedHalfWidths = enemy.width / 2 + projectile.radius;
        const combinedHalfHeights = enemy.height / 2 + projectile.radius;

        if (distX < combinedHalfWidths && distY < combinedHalfHeights) {
          // Remove projectile
          this.projectiles.splice(i, 1);

          if (enemy instanceof Boss) {
            enemy.takeDamage(5);
            if (enemy.isDead) {
              this.enemies.splice(j, 1); // Remove boss only if dead
            }
          } else {
            // Normal enemies die instantly
            this.enemies.splice(j, 1);
          }

          this.score += 1; // Increment score
          break; // Stop checking this projectile
        }
      }
    }

    if (this.isGameOver) {
      ctx.fillStyle = "red";
      ctx.font = "48px sans-serif";
      ctx.fillText("Game Over", this.width / 2 - 100, this.height / 2);
    }
  }
}
