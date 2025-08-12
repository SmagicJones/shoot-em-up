export class Enemy {
  constructor(x, y, width = 40, height = 40, speed = 3, imageUrl = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.image = new Image();
    this.image.src =
      imageUrl || "https://www.pngarts.com/files/10/Boulder-PNG-Pic.png"; // Default image if none provided
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    // ctx.fillStyle = "red"; // Enemy color
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.imageLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "red"; // Fallback color if image not loaded
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
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
