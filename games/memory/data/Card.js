(function (scope) {
    "use strict";

    var s = {};

    s.icon = "assets/images/icon.png";
    s.IMAGE_1 = "../assets/images/card-image-01.png";
    s.IMAGE_2 = "../assets/images/card-image-02.png";
    s.IMAGE_3 = "../assets/images/card-image-03.png";
    s.IMAGE_4 = "../assets/images/card-image-04.png";
    s.IMAGE_5 = "../assets/images/card-image-05.png";
    s.IMAGE_6 = "../assets/images/card-image-06.png";

    var p = {};

    p.state = 0;
    p.STATE_HIDDEN = 0;
    p.STATE_SHOW = 1;
    p.STATE_LOCK = 2;

    p.container = null;

    p.matchingCard = null;

    p.cardBack = null;
    p.cardFront = null;
    p.cardFrontLock = null;

    p._cardBackTween = null;
    p._cardFrontTween = null;

    p.initialize = function (picture, width, height) {
        scope.AbstractView.prototype.initialize.call();
        this.cardBack = new createjs.Container();
        var sprite = new createjs.Sprite();
        this.cardBack.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], -width, -height, 1, width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);

        var bd = new createjs.BitmapData();

        this.cardFront = new createjs.Container();
        sprite = new createjs.Sprite();
        this.cardFront.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], width, -height, 1, -width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);

        this.cardFrontLock = new createjs.Sprite();
        sprite = new createjs.Sprite();
        this.cardFrontLock.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], width, -height, 1, -width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);
    };

    p.reveal = function () {
      // Plays flip animation.
      if (this.state == this.STATE_HIDDEN) {
        this.state = this.STATE_SHOW;
      }

      if (this._cardBackTween) {
          this._cardBackTween.setPosition(this._cardBackTween.duration, 0);
          createjs.Tween.removeTweens(this._cardBackTween);
      }
      if (this._cardFrontTween) {
          this._cardFrontTween.setPosition(this._cardFrontTween.duration, 0);
          createjs.Tween.removeTweens(this._cardFrontTween);
      }

      this._cardBackTween = createjs.Tween.get(this.cardBack)
        .to({scaleX: 1, scaleY: 1, alpha: 1}, 0)
        .to({scaleX: 0, scaleY: 1.3}, 1000, {ease: createjs.Ease.sineIn()}),
        .to({alpha: 1}, 0);
      this._cardFrontTween = createjs.Tween.get(this.cardFront)
        .to({scaleX: 0, scaleY: 1.3, alpha: 0}, 0),
        .wait(1000),
        .to({alpha: 1}, 0)
        .to({scaleX: 1, scaleY: 1}, 1000, {ease: createjs.Ease.sineOut()})
        .call();
    }

    p.hide = function () {
      // Plays reverse flip animation
      if (this.state == this.STATE_SHOW) {
          this.state = this.STATE_HIDDEN;
      }

      if (this._cardBackTween) {
          this._cardBackTween.setPosition(this._cardBackTween.duration, 0);
          createjs.Tween.removeTweens(this.cardBack);
      }
      if (this._cardFrontTween) {
          this._cardFrontTween.setPosition(this._cardFrontTween.duration, 0);
          createjs.Tween.removeTweens(this.cardFront);
      }

      this._cardBackTween = createjs.Tween.get(this.cardBack);
      this._cardFrontTween = createjs.Tween.get(this.cardFront);
    }

    p.lock = function () {
      // Locks own with particles!
      if (this.state == this.STATE_SHOW) {
        this.state = this.STATE_LOCK;
      }

      this.cardFront.alpha = 0;
      this.cardBack.alpha = 0;
      this.cardFrontLock.alpha = 1;

      this._cardFrontTween = createjs.Tween.get(this.cardFrontLock.container);
    }

    p.unlock = function () {
      // Effectively a reset. Don't animate.
      this.state = this.STATE_HIDDEN;
      this.cardBack.alpha = 1;
      this.cardFront.alpha = 0;
      this.cardFrontLock.alpha = 0;
    }

    scope.Card = scope.AbstractView.extend(p, s);

}(window));
