		var a = 10;
		var score = 0;
		var r = 10;
		var level = 1;

// SCENE
		function Scene() {
			this.balls = [];
		}

		Scene.prototype = {
			addBall: function (rychlost) {
				this.balls.push(new Ball(rychlost));
			},

			init: function (ballsCount, rychlost) {
				this.balls = [];

				for(var i = 0; i < ballsCount; i++) {
					this.addBall(rychlost);
				}
			},

			hit: function (x, y) {
				for(var i in this.balls) {
					if (!this.balls[i].wasHit && this.balls[i].isHit(x, y)) {
						this.balls[i].image = explode;
						this.balls[i].wasHit = true;
						audio3.load();
						audio3.play();
					}
				}
			},

			render: function () {
				context.drawImage(background,0, 0, canvas.width, canvas.height)

				for (var i in this.balls) {
					this.balls[i].draw(context);
				}
			},

			move: function (dt) {
				for (var i in this.balls) {
					this.balls[i].move(dt);
				}
			},

			isOver: function () {
				for (var i in this.balls) {
					if(this.balls[i].lives <= 0) {
						this.balls.splice(i, 1);
						score++;
						continue;	
					}

					if(this.balls[i].isOut()) {
						this.balls.splice(i, 1);
						audio1.play();//game over
						alert("Your score is "+score+".")
						window.location.assign("menu.html");
						return true;
					}
				}

				if(this.balls.length == 0) {
					a += 1;
					r += 0.5;
					this.init(a, r);//pokracuje ale rychlejsie
					audio2.play();//win
					level++;
				}

				return false;
			},
		};

		var time;
		var scene = new Scene();

		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}

		canvas.addEventListener('click', function(event) {
			var mouse = getMousePos(canvas, event);
			scene.hit(mouse.x, mouse.y);
		}, false);

		function step() {
			var now = Date.now();
			var dt = (now - time) / 100;

			time = now;

			scene.move(dt);

			if(scene.isOver()) // Stop the game
				return;

			scene.render();

			requestAnimationFrame(step);
		}

		window.onload = function() {
			time = Date.now();

			scene.init(a, r);

			requestAnimationFrame(step);
		};