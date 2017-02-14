(function (scope) {
    "use strict";

    var s = {};

    s.icon = "assets/images/icon.png";

    var p = {};
    p.introView = null;
    p.gameView = null;

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call();

        var introView = new scope.IntroView();
        introView.addEventListener(scope.IntroView.START_EASY, this._onGameStartEasy.bind(this));
        introView.addEventListener(scope.IntroView.START_HARD, this._onGameStartHard.bind(this));
        this.container.addChild(introView.container);
    };

    p._onGameStartEasy = function () {
        this.gameView = new scope.GameView(scope.GameView.MODE_EASY);
        this.container.removeChild(introView.container);
        this.container.addChild(this.gameView.container);
    };

    p._onGameStartHard = function () {
      this.gameView = new scope.GameView(scope.GameView.MODE_HARD);
      this.container.removeChild(introView.container);
      this.container.addChild(this.gameView.container);
    };

    p._returnToIntro = function () {
      this.gameView && this.container.removeChild(this.gameView.container);
      this.container.addChild(this.introView.container);
    }

    scope.GameMemory = scope.AbstractView.extend(p, s);

}(window));
