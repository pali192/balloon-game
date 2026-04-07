// BALLOONS
		function Ball(rychlost) {
			this.image = balloon;

			this.width = 64;
			this.height = 64;

			this.x = Math.floor(Math.random() * (canvas.width - this.width));
			this.y = Math.floor((Math.random() * canvas.height) + canvas.height);

			this.wasHit = false;
			this.lives = 1.0;
			
			this.dy = rychlost;
		}

		Ball.prototype = {
			draw: function () {
				context.save();
				context.globalAlpha = this.lives;
				context.drawImage(this.image, this.x, this.y, this.width, this.height);
				context.globalAlpha = 1.0;
				context.restore();

				context.fillStyle="99FF00";
				context.font = "bold 25px sans Serif";
				context.fillText("LEVEL: "+level ,20,575);
				context.fillStyle="99FF00";
				context.font = "bold 25px sans Serif";
				context.fillText("SCORE: "+score ,620,575);
			},
			move: function (dt) {
				this.y -= this.dy * dt;

				if(this.wasHit && (this.lives > 0)) {
					this.lives = this.lives-0.1;
				}
			},

			isOut: function () {
				return (this.y <= -this.height);
			},

			isHit: function (x, y) {
				return (
					(y > this.y) && (y < (this.y + this.height)) &&
					(x > this.x) && (x < (this.x + this.width))
				);
			},
		};

