(function (scope) {
    "use strict";

    var s = {};

    s.STATE_HIDDEN = 0;
    s.STATE_SHOW = 1;
    s.STATE_LOCK = 2;

    s.REQUEST_FLIP = "requestFlip";
    s.FLIP_TIME = 700;
    s.ANIMATION_SHOW_COMPLETE = "animationShowComplete";
    s.ANIMATION_HIDE_COMPLETE = "animationHideComplete";
    s.ANIMATION_LOCK_COMPLETE = "animationLockComplete";

    s.IMAGE_BACK = "games/memory/assets/images/CardBack.png";
    s.IMAGE_FRONT = "games/memory/assets/images/CardFace.png";
    s.IMAGE_1 = "games/memory/assets/images/card-image-01.png";
    s.IMAGE_2 = "games/memory/assets/images/card-image-02.png";
    s.IMAGE_3 = "games/memory/assets/images/card-image-03.png";
    s.IMAGE_4 = "games/memory/assets/images/card-image-04.png";
    s.IMAGE_5 = "games/memory/assets/images/card-image-05.png";
    s.IMAGE_6 = "games/memory/assets/images/card-image-06.png";
    s.CARD_DIMENSIONS = {width: 282, height: 397};
    s.IMAGE_DIMENSION = 350;

    var p = {};

    p.state = 0;

    p.container = null;
    p.width = null;
    p.height = null;

    p.matchingCard = null;

    p.cardBack = null;
    p.cardFront = null;
    p.cardFrontLock = null;

    p._cardBackTween = null;
    p._cardFrontTween = null;

    p.initialize = function (picture, width, height) {
        scope.AbstractView.prototype.initialize.call(this);

        this.container.addEventListener("click", this.onClick.bind(this));
        this.width = width;
        this.height = height;

        this.cardBack = new createjs.Container();
        this.cardFront = new createjs.Container();
        this.cardFrontLock = new createjs.Container();

        var imageDim = width * 0.8;
        var scaleDim = imageDim / s.IMAGE_DIMENSION;

        // Create and resize the card backs.
        var bmp = new createjs.Bitmap(s.IMAGE_BACK);
        this.cardBack.addChild(bmp);
        bmp.scaleX = width / s.CARD_DIMENSIONS.width;
        bmp.scaleY = height / s.CARD_DIMENSIONS.height;

        bmp = new createjs.Bitmap(s.IMAGE_FRONT);
        this.cardFront.addChild(bmp);
        bmp.scaleX = width / s.CARD_DIMENSIONS.width;
        bmp.scaleY = height / s.CARD_DIMENSIONS.height;

        bmp = new createjs.Bitmap(s.IMAGE_FRONT);
        this.cardFrontLock.addChild(bmp);
        bmp.filters = [new createjs.ColorFilter(.8, .8, .8, 1)];
        bmp.scaleX = width / s.CARD_DIMENSIONS.width;
        bmp.scaleY = height / s.CARD_DIMENSIONS.height;

        // Apply and resize the image.
        bmp = new createjs.Bitmap(picture);
        this.cardFront.addChild(bmp);
        bmp.scaleX = bmp.scaleY = scaleDim;
        bmp.x = width * 0.1;
        bmp.y = (height - imageDim) / 2;

        bmp = new createjs.Bitmap(picture);
        this.cardFrontLock.addChild(bmp);
        bmp.filters = [new createjs.ColorFilter(.8, .8, .8, 1)];
        bmp.scaleX = bmp.scaleY = scaleDim;
        bmp.x = width * 0.1;
        bmp.y = (height - imageDim) / 2;

      /*
        var sprite = new createjs.Sprite();
        this.cardBack.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], -width, -height, 1, width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);

        var bd = new createjs.BitmapData();

        sprite = new createjs.Sprite();
        this.cardFront.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], width, -height, 1, -width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);

        sprite = new createjs.Sprite();
        this.cardFrontLock.addChild(sprite);
        var g = sprite.graphics;
        g.beginRadialGradientFill(["0090DF", "0040BF"], [0, 1], width, -height, 1, -width * 2, height * 2, 100);
        g.drawRoundRect(0, 0, width, height, (width + height) / 10);
      */

      this.container.addChild(this.cardBack, this.cardFront, this.cardFrontLock);
      this.cardBack.regX = this.cardFront.regX = this.cardFrontLock.regX = width / 2;
      this.cardBack.regY = this.cardFront.regY = this.cardFrontLock.regY = height / 2;

      // Start off by showing the card.
      this.cardBack.alpha = 0;
      this.cardFront.alpha = 1;
      this.cardFrontLock.alpha = 0;

      this.state = s.STATE_SHOW;
    };

    p.onClick = function (e) {
        this.trigger(s.REQUEST_FLIP, this);
    };

    p.reveal = function (delay = 0) {
      // Plays flip animation.
      if (this.state == s.STATE_SHOW || this.state == s.STATE_LOCK) {
        return;
      }

      this.state = s.STATE_SHOW;

      if (this._cardBackTween) {
          this._cardBackTween.setPosition(this._cardBackTween.duration, 0);
          createjs.Tween.removeTweens(this.cardBack);
      }
      if (this._cardFrontTween) {
          this._cardFrontTween.setPosition(this._cardFrontTween.duration, 0);
          createjs.Tween.removeTweens(this.cardFront);
      }

      this._cardBackTween = createjs.Tween.get(this.cardBack)
          .wait(delay)
          .to({scaleX: 1, scaleY: 1, alpha: 1}, 0)
          .to({scaleX: 0, scaleY: 1.3}, s.FLIP_TIME / 2, createjs.Ease.sineIn)
          .to({alpha: 1}, 0);
      this._cardFrontTween = createjs.Tween.get(this.cardFront)
          .wait(delay)
          .to({scaleX: 0, scaleY: 1.3, alpha: 0}, 0)
          .wait(s.FLIP_TIME / 2)
          .to({alpha: 1}, 0)
          .to({scaleX: 1, scaleY: 1}, s.FLIP_TIME / 2, createjs.Ease.sineOut)
          .call(this._onAnimationShowComplete, null, this);
    }

    p.hide = function (delay = 0) {
        // Plays reverse flip animation
        if (this.state == s.STATE_HIDDEN || this.state == s.STATE_LOCK) {
            return;
        }

        this.state = s.STATE_HIDDEN;

        if (this._cardBackTween) {
            this._cardBackTween.setPosition(this._cardBackTween.duration, 0);
            createjs.Tween.removeTweens(this.cardBack);
        }
        if (this._cardFrontTween) {
            this._cardFrontTween.setPosition(this._cardFrontTween.duration, 0);
            createjs.Tween.removeTweens(this.cardFront);
        }

        this._cardFrontTween = createjs.Tween.get(this.cardFront)
            .wait(delay)
            .to({scaleX: 1, scaleY: 1, alpha: 1}, 0)
            .to({scaleX: 0, scaleY: 1.3}, s.FLIP_TIME / 2, createjs.Ease.sineIn)
            .to({alpha: 1}, 0);
        this._cardBackTween = createjs.Tween.get(this.cardBack)
            .wait(delay)
            .to({scaleX: 0, scaleY: 1.3, alpha: 0}, 0)
            .wait(s.FLIP_TIME / 2)
            .to({alpha: 1}, 0)
            .to({scaleX: 1, scaleY: 1}, s.FLIP_TIME / 2, createjs.Ease.sineOut)
            .call(this._onAnimationHideComplete, null, this);
    }

    p.lock = function (delay = 0) {
      // Locks own. State doesn't matter.
      this.state = s.STATE_LOCK;

      this.cardFront.alpha = 0;
      this.cardBack.alpha = 0;
      this.cardFrontLock.alpha = 1;

      this._cardFrontTween = createjs.Tween.get(this.cardFrontLock)
        .wait(delay)
        .to({scaleX: 1.3, scaleY: 1.3}, 300, createjs.Ease.sineOut)
        .to({scaleX: 1, scaleY: 1}, 300, createjs.Ease.sineIn)
        .to({scaleX: 1.3, scaleY: 1.3}, 300, createjs.Ease.sineOut)
        .to({scaleX: 1, scaleY: 1}, 300, createjs.Ease.sinein)
        .call(this._onAnimationLockComplete, null, this);
    }

    p.unlock = function () {
      // Effectively a reset. Don't animate.
      this.state = s.STATE_HIDDEN;
      this.cardBack.alpha = 1;
      this.cardFront.alpha = 0;
      this.cardFrontLock.alpha = 0;
    }

    p._onAnimationShowComplete = function () {
      this.trigger(s.ANIMATION_SHOW_COMPLETE, this);
    }
    p._onAnimationHideComplete = function () {
      this.trigger(s.ANIMATION_HIDE_COMPLETE, this);
    }
    p._onAnimationLockComplete = function () {
      this.trigger(s.ANIMATION_LOCK_COMPLETE, this);
    }

    scope.Card = scope.AbstractView.extend(p, s);

}(window));
