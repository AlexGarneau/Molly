(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;
    s.MODE_EASY = "easy";
    s.MODE_HARD = "hard";

    var p = {};
    p.container = null;
    p.mode = null;
    p.cards = null;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call();
        s.Instance = this;
        this.container = new createjs.Container();
    };

    p.setupEasyMode = function () {
        var stageWidth = scope.ViewManager.Stage.stageWidth;
        var stageHeight = scope.ViewManager.Stage.stageHeight;
        this._setupCards(3, stageWidth / 6, stageHeight / 3);
    }

    p.setupHardMode = function () {
        var stageWidth = scope.ViewManager.Stage.stageWidth;
        var stageHeight = scope.ViewManager.Stage.stageHeight;
        this._setupCards(6, stageWidth / 8, stageHeight / 4);
    }

    p._setupCards = function (sets, cardWidth, cardHeight) {
      var pictures = [Card.Image_1, Card.Image_2, Card.Image_3, Card.Image_4, Card.Image_5, Card.Image_6];
      this.cards = [];
      var cardA, cardB;
      for (var i = 0; i < sets; i++) {
          picture = pictures.splice(Math.floor(Math.random() * pictures.length), 1)[0];
          cardA = new scope.Card(picture, cardWidth, cardHeight);
          cardB = new scope.Card(picture, cardWidth, cardHeight);
          cardA.matchingCard = cardB;
          cardB.matchingCard = cardA;
          this.container.addChild(cardA.container);
          this.container.addChild(cardB.container);
          this.cards.push(cardA);
          this.cards.push(cardB);
      }
    }

    p.reset = function () {
      this.container.empty();
    }

    scope.GameView = scope.AbstractView.extends(p, s);

}(window));
