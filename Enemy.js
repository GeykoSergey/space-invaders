class Enemy {
  constructor(game, positionX, positionY) {
    this.game = game;
    this.width = this.game.enemySize;
    this.height = this.game.enemySize;
    this.x = 0;
    this.y = 0;
    this.positionX = positionX;
    this.positionY = positionY;
    this.markedForDeletion = false;
  }
  draw(context) {
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(x, y) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;
    // check collision enemies - projectiles
    this.game.projectilesPool.forEach((projectile) => {
      if (
        !projectile.free &&
        this.game.checkCollision(this, projectile) &&
        this.lives > 0
      ) {
        // this.markedForDeletion = true;
        this.hit(1);
        projectile.reset();
        // this.game.score++;
        // if (!this.game.gameOver) this.game.score++;
      }
    });

    if (this.lives < 1) {
      if (this.game.spriteUpdate) this.frameX++;
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;
        if (!this.game.gameOver) this.game.score += this.maxLives;
      }
    }

    // Check collision Enemies - Player
    if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
      // this.markedForDeletion = true;
      // if (this.game.gameOver && this.game.score > 0) this.game.score--;
      this.lives = 0;
      this.game.player.lives--;
      if (this.game.player.lives < 1) this.game.gameOver = true;
    }

    // loose condition
    if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
      // this.game.gameOver = true;
      this.markedForDeletion = true;
    }
  }

  hit(damage) {
    this.lives -= damage;
  }
}
