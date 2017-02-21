(function (scope) {
    "use strict";

    var s = {};

    var p = {};
    p.introView = null;
    p.gameView = null;

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call(this);

        var introView = this.introView = new scope.IntroView();
        introView.on(scope.IntroView.START_EASY, this._onGameStartEasy.bind(this));
        introView.on(scope.IntroView.START_HARD, this._onGameStartHard.bind(this));
        this.container.addChild(introView.container);
    };

    p.start = function () {
      this._returnToIntro();
    }

    p._onGameStartEasy = function () {
        this.gameView = new scope.GameView(scope.GameView.MODE_EASY);
        this.gameView.on(scope.GameView.GAME_COMPLETE, this._returnToIntro.bind(this));
        this.container.removeChild(this.introView.container);
        this.container.addChild(this.gameView.container);
    };

    p._onGameStartHard = function () {
      this.gameView = new scope.GameView(scope.GameView.MODE_HARD);
      this.gameView.on(scope.GameView.GAME_COMPLETE, this._returnToIntro.bind(this));
      this.container.removeChild(this.introView.container);
      this.container.addChild(this.gameView.container);
    };

    p._returnToIntro = function () {
      this.gameView && this.container.removeChild(this.gameView.container);
      this.gameView = null;
      this.container.addChild(this.introView.container);
    }

    scope.GameMemory = scope.AbstractView.extend(p, s);

}(window));
