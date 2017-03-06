(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;
    s.GAME_COMPLETE = "gameComplete";
    s.MODE_EASY = "easy";
    s.MODE_HARD = "hard";

    var p = {};
    p.container = null;
    p.cardContainer = null;

    p.stageWidth = null;
    p.stageHeight = null;

    p.background = null;
    p.fireworks = null;
    p.mode = null;
    p.cards = null;
    p.firstFlipped = null;
    p.canFlip = false;
    p._completeShuffle = false;
    p._completeGame = false;
    p._completeDance = false;
    p._originalSpots = null;

    p.backBtn = null;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call(this);
        scope.GameView.Instance = this;
        this.canFlip = false;

        var stageWidth = this.stageWidth = scope.ViewManager.Stage.canvas.width;
        var stageHeight = this.stageHeight = scope.ViewManager.Stage.canvas.height;

        var graphics = new createjs.Graphics();
        graphics.beginRadialGradientFill(["#50B0DF", "#30A0BF"], [0, 1], -stageWidth, -stageHeight, 1, stageWidth * 2, stageHeight * 2, stageWidth + stageHeight);
        graphics.drawRect(0, 0, stageWidth, stageHeight);
        this.background = new createjs.Shape(graphics);
        this.container.addChild(this.background);

        this.fireworks = new scope.Firework();
        this.container.addChild(this.fireworks.container);

        this.cardContainer = new createjs.Container();
        this.container.addChild(this.cardContainer);

        this.backBtn = new scope.Button("BACK");
        this.container.addChild(this.backBtn.container);
        this.backBtn.setWidth(70);
        this.backBtn.setHeight(40);
        this.backBtn.container.x = 30;
        this.backBtn.container.y = stageHeight - this.backBtn.height - 30;
        this.backBtn.on(scope.Button.CLICKED, this._onBackClick.bind(this));

        if (mode == s.MODE_EASY) {
          this._setupEasyMode();
        } else {
          this._setupHardMode();
        }
    };

    p._setupEasyMode = function () {
        this._setupCards(3);
        this._shuffleCards();
    };

    p._setupHardMode = function () {
        this._setupCards(6);
        this._shuffleCards();
    };

    p._setupCards = function (sets) {
        var pictures = [
          scope.Card.IMAGE_1,
          scope.Card.IMAGE_2,
          scope.Card.IMAGE_3,
          scope.Card.IMAGE_4,
          scope.Card.IMAGE_5,
          scope.Card.IMAGE_6
        ];
        var stageWidth = this.stageWidth;
        var stageHeight = this.stageHeight;
        var cardA, cardB;
        var rows = 0, columns = 0;
        if (sets == 3) {
          rows = 3;
          columns = 3;
        } else if (sets == 6) {
          rows = 5;
          columns = 4;
        }

        var gridWidth = stageWidth / (columns*2);
        var gridHeight = stageHeight / (rows*2);
        var xStart = gridWidth;
        var yStart = gridHeight * 1.5;

        this.cards = [];
        var picture;
        for (var i = 0; i < sets; i++) {
            picture = pictures.splice(Math.floor(Math.random() * pictures.length), 1)[0];
            cardA = new scope.Card(picture, gridWidth, gridHeight * 2);
            cardB = new scope.Card(picture, gridWidth, gridHeight * 2);

            cardA.on(scope.Card.REQUEST_FLIP, this._onCardClicked.bind(this));
            cardB.on(scope.Card.REQUEST_FLIP, this._onCardClicked.bind(this));

            cardA.on(scope.Card.ANIMATION_SHOW_COMPLETE, this._onCardFlipped.bind(this));
            cardB.on(scope.Card.ANIMATION_SHOW_COMPLETE, this._onCardFlipped.bind(this));
            cardA.on(scope.Card.ANIMATION_HIDE_COMPLETE, this._onCardHidden.bind(this));
            cardB.on(scope.Card.ANIMATION_HIDE_COMPLETE, this._onCardHidden.bind(this));
            cardA.on(scope.Card.ANIMATION_LOCK_COMPLETE, this._onCardLocked.bind(this));
            cardB.on(scope.Card.ANIMATION_LOCK_COMPLETE, this._onCardLocked.bind(this));

            cardA.matchingCard = cardB;
            cardB.matchingCard = cardA;
            this.cardContainer.addChild(cardA.container);
            this.cardContainer.addChild(cardB.container);
            this.cards.push(cardA);
            this.cards.push(cardB);

            cardA.container.x = xStart;
            cardA.container.y = yStart;

            xStart += gridWidth * 2;
            if (xStart > stageWidth) {
              xStart = gridWidth;
              yStart += gridHeight * 3
            }

            cardB.container.x = xStart;
            cardB.container.y = yStart;

            xStart += gridWidth * 2;
            if (xStart > stageWidth) {
              xStart = gridWidth;
              yStart += gridHeight * 3
            }
        }
    };

    p._shuffleCards = function () {
        // Shuffling is fun. All the cards are revealed, then flip themselves over, then converge to the center, do a little dance, and spread out.
        var positions = [];
        this._originalSpots = [];
        var pos, count = this.cards.length;
        for (var i = 0, l = count; i < l; i++) {
            // Randomize card positions.
            positions.push({x: this.cards[i].container.x, y: this.cards[i].container.y});
            this._originalSpots.push({x: this.cards[i].container.x, y: this.cards[i].container.y});
            this.container.setChildIndex(this.cards[i], ((Math.random() * this.cards.length) | 0));
        }

        var centerX = this.stageWidth / 2;
        var centerY = this.stageHeight / 2;

        for (var i = 0, l = count; i < l; i++) {
            // Run shuffle animation and enable "canFlip" after it's done.
            this.cards[i].hide(1000);

            pos = positions.splice((Math.random() * positions.length) | 0, 1)[0];
            createjs.Tween.get(this.cards[i].container)
              .wait(scope.Card.FLIP_TIME + 1000)
              .to({x: centerX, y: centerY}, 1000, createjs.Ease.sineInOut)
              .call(this._onShuffleSound.bind(this))
              .wait(1000 * i / l)
              .to({x: centerX + this.cards[i].width / 2}, 100, createjs.Ease.sineOut)
              .to({x: centerX}, 100, createjs.Ease.sineIn)
              .wait(1000 * (l - i) / l)
              .to(pos, 1000, createjs.Ease.sineInOut)
              .call(this._onShuffleComplete.bind(this));
        }
    };

    p._onShuffleSound = function () {
        scope.Sounds.playSound(scope.Sounds.MEMORY_SOUND_SHUFFLE);
    };

    p._onShuffleComplete = function () {
        this._completeShuffle = true;
        this.canFlip = true;
    };

    p._onCardClicked = function (card) {
        if (this.canFlip && card.state == scope.Card.STATE_HIDDEN) {
            scope.Sounds.playSound(scope.Sounds.MEMORY_SOUND_FLIP);
            card.reveal();
            this.canFlip = false;
        }
    };

    p._onCardFlipped = function (card) {
      if (this.firstFlipped) {
        // Card already flipped. Moment of truth!
        if (this.firstFlipped == card.matchingCard || this.firstFlipped.matchingCard == card) {
          // We have a match! Lock the cards and check if all have been locked.
          card.lock();
          this.firstFlipped.lock();
          this.fireworks.burstGold(card.container.x, card.container.y);
          this.fireworks.burstGold(this.firstFlipped.container.x, this.firstFlipped.container.y);
          scope.Sounds.playSound(scope.Sounds.MEMORY_SOUND_DING);
        } else {
          // Not a match. Delay for a second, then flip back over.
          this.canFlip = false;
          this._reflipCards([this.firstFlipped, card]);
          return;
        }
      } else {
        // First to flip. Leave it.
        this.firstFlipped = card;
        this.canFlip = true;
      }
    };

    p._onCardHidden = function (e) {
      if (!this._completeShuffle) { return; }
      this.canFlip = true;
      this.firstFlipped = null;
    };

    p._onCardLocked = function (e) {
      // Animation over.
      this.canFlip = true;
      this.firstFlipped = null;

      // Check all the cards.
      if (!this._completeGame) {
        for (var i = this.cards.length - 1; i >= 0; i--) {
          if (this.cards[i].state != scope.Card.STATE_LOCK) {
            // Not done yet.
            return;
          }
        }

        // If we're here, that means we've won!

        scope.Sounds.playSound(scope.Sounds.MEMORY_MUSIC_VICTORY);

        var origSpot;
        for (var i = 0, l = this.cards.length; i < l; i++) {
          origSpot = this._originalSpots[i];
          createjs.Tween.get(this.cards[i].container)
            .to(origSpot, 1000, createjs.Ease.sineInOut)
            .wait(50)

            .to({scaleX: 1.2, scaleY: 1.2}, 250, createjs.Ease.sineOut)
            .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineIn)
            .to({scaleX: 1.2, scaleY: 1.2}, 250, createjs.Ease.sineOut)
            .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineIn)

            .to({rotation: -10}, 150, createjs.Ease.sineOut)
            .to({rotation: 10}, 300, createjs.Ease.sineInOut)
            .to({rotation: -10}, 300, createjs.Ease.sineInOut)
            .to({rotation: 10}, 300, createjs.Ease.sineInOut)
            .to({rotation: -10}, 300, createjs.Ease.sineInOut)
            .to({rotation: 0}, 150, createjs.Ease.sineInOut)

            .wait(1000 * i / l)
            .to({y: origSpot.y - 100}, 200, createjs.Ease.sineOut)
            .to({y: origSpot.y}, 200, createjs.Ease.sineIn)
            .wait(1000 * (l - i) / l)

            .wait(1000 * (l - i) / l)
            .to({y: origSpot.y - 100}, 200, createjs.Ease.sineOut)
            .to({y: origSpot.y}, 200, createjs.Ease.sineIn)
            .wait(200 + 1000 * i / l)

            .wait(100)
            .to({x: -1000, y: origSpot.y}, 1000, createjs.Ease.sineIn)
            .call(this._onDanceComplete.bind(this));
        }
      }

      var rd = this._randomFirework.bind(this);
      createjs.Tween.get(this.container)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
        .wait(300).call(rd, this)
    };

    p._randomFirework = function () {
        this.fireworks.burstGold(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
    };

    p._onDanceComplete = function () {
        if (!this._completeDance) {
          this.trigger(s.GAME_COMPLETE);
          this._completeDance = true;
          this.fireworks.reset();
        }
    };

    p._onBackClick = function () {
        this.trigger(s.GAME_COMPLETE);
        this._completeDance = true;
        this.fireworks.reset();
    };

    p._reflipCards = function (cards) {
      for (var i = cards.length - 1; i >= 0; i--) {
        cards[i].hide(500);
      }

      scope.Sounds.playSound(scope.Sounds.MEMORY_SOUND_FLIP);
    };

    scope.GameView = scope.AbstractView.extend(p, s);

}(window));
