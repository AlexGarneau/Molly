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
        introView.on(scope.IntroView.START_INSTRUCTIONS, this._onInstructionsStart.bind(this));
        this.container.addChild(introView.container);

        // We can just have instructions view on the side. It doesn't need dynamic creation.
        this.instructionsView = new scope.InstructionsView();
        this.instructionsView.on(scope.InstructionsView.BACK, this._returnToIntro.bind(this));
    };

    p.start = function () {
      // Start by returning to intro. Silly.
      this._returnToIntro();
    }

    p._onGameStartEasy = function () {
        this.gameView = new scope.GameView(scope.GameView.MODE_EASY);
        this.gameView.on(scope.GameView.GAME_COMPLETE, this._returnToIntro.bind(this));
        this.container.removeChild(this.introView.container);
        this.container.addChild(this.gameView.container);
        scope.Sounds.stopSound(scope.Sounds.MEMORY_MUSIC_INTRO);
    };

    p._onGameStartHard = function () {
      this.gameView = new scope.GameView(scope.GameView.MODE_HARD);
      this.gameView.on(scope.GameView.GAME_COMPLETE, this._returnToIntro.bind(this));
      this.container.removeChild(this.introView.container);
      this.container.addChild(this.gameView.container);
      scope.Sounds.stopSound(scope.Sounds.MEMORY_MUSIC_INTRO);
    };

    p._onInstructionsStart = function () {
      this.container.removeChild(this.introView.container);
      this.container.addChild(this.instructionsView.container);
    };

    p._returnToIntro = function () {
      if (this.gameView) {
        this.container.removeChild(this.gameView.container);
        delete this.gameView;
        this.gameView = null;
      }
      this.container.removeChild(this.instructionsView.container);
      this.container.addChild(this.introView.container);
      scope.Sounds.playSound(scope.Sounds.MEMORY_MUSIC_INTRO);
    }

    scope.GameMemory = scope.AbstractView.extend(p, s);

}(window));
