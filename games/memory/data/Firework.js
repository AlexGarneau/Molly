(function (scope) {
    "use strict";

    var s = {};

    var p = {};
    p.container = null;
    p.particles = null;

    p.initialize = function (picture) {
        scope.AbstractView.prototype.initialize.call(this);
        this.particles = [];

        this._update = this.update.bind(this);
        createjs.Ticker.addEventListener("tick", this._update);
    };

    p._update;
    p.update = function (e) {
      var deltaTime = e.delta;
      var particle;
        for (var i = this.particles.length - 1; i >= 0; i--) {
            particle = this.particles[i];
            particle.sprite.vx += particle.ax;
            particle.sprite.vy += particle.ay;
            particle.sprite.x += particle.vx;
            particle.sprite.y += particle.vy;
            particle.sprite.alpha = Math.min(1, particle.life / particle.fade);
            particle.life -= deltaTime;
            if (particle.life <= 0) {
              this.container.removeChild(particle.sprite);
              this.particles.splice(i, 1);
            }
        }
    }

    p.reset = function () {
      createjs.Ticker.removeEventListener("tick", this._update);
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.container.removeChild(this.particles[i].sprite);
        this.particles.splice(i, 1);
      }
    }

    p.burstSimple = function (x, y) {
      // Plays flip animation.
    }

    p.burstGold = function (x, y) {
      // Plays golden animation.
      var spriteCount = (Math.random() * 10 | 0) + 25;
      var particles = this.createDefaultParticles(spriteCount, "#EDED10");

      var particle;
      for (var i = 0, l = particles.length; i < l; i++) {
        particle = particles[i];
        particle.sprite.x = x;
        particle.sprite.y = y;
      }
    }

    p.createDefaultParticles = function (count, color) {
      var particles = [];
      var particle, angle, vel, graphics;
      for (var i = 0; i < count; i++) {
        particle = new scope.FireworkParticle();
        particle.life = ((Math.random() * 500) | 0) + 1000;
        vel = Math.random() * 2 + 1;
        angle = (Math.random() * Math.PI * 2);
        particle.vx = Math.cos(angle) * vel;
        particle.vy = Math.sin(angle) * vel;
        particle.ay = 0.04;

        graphics = new createjs.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, Math.random() * 4 + 3);
        particle.sprite = new createjs.Shape(graphics);
        this.container.addChild(particle.sprite);

        particles.push(particle);
        this.particles.push(particle);
      }
      return particles;
    }

    scope.Firework = scope.AbstractView.extend(p, s);

    var particleS = {};
    var particleP = {};

    particleP.sprite = null;
    particleP.vx = 0;
    particleP.vy = 0;
    particleP.ax = 0;
    particleP.ay = 0.1;
    particleP.life = 1000;
    particleP.fade = 300;

    particleP.initialize = function () {}

    scope.FireworkParticle = scope.AbstractView.extend(particleP, particleS);

}(window));
