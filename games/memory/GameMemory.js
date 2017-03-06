(function (scope) {
    "use strict";

    var s = {};

    s.ASSETS = [
        scope.Button.BUTTON_BG_UP,
        scope.Button.BUTTON_BG_OVER,
        scope.Button.BUTTON_BG_DOWN,
        scope.Button.BUTTON_ARROW_UP,
        scope.Button.BUTTON_ARROW_OVER,
        scope.Button.BUTTON_ARROW_DOWN,
        scope.Card.IMAGE_BACK,
        scope.Card.IMAGE_FRONT,
        scope.Card.IMAGE_1,
        scope.Card.IMAGE_2,
        scope.Card.IMAGE_3,
        scope.Card.IMAGE_4,
        scope.Card.IMAGE_5,
        scope.Card.IMAGE_6,
        scope.IntroView.INTRO_TITLE,
        scope.IntroView.INTRO_BG,
        scope.IntroView.INTRO_MOLLY
        //"games/memory/assets/images/molly-corner-shot.png"
        //scope.InstructionsView.INTRUCTIONS_1,
        //scope.InstructionsView.INTRUCTIONS_2,
        //scope.InstructionsView.INTRUCTIONS_3,
        //scope.InstructionsView.INTRUCTIONS_4
    ];

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
      this.instructionsView.reset();
    };

    p._returnToIntro = function () {
      if (this.gameView) {
        this.container.removeChild(this.gameView.container);
        delete this.gameView;
        this.gameView = null;
      }
      this.container.removeChild(this.instructionsView.container);
      this.container.addChild(this.introView.container);
      scope.Sounds.playSound(scope.Sounds.MEMORY_MUSIC_INTRO, true);
    }

    scope.GameMemory = scope.AbstractView.extend(p, s);

}(window));
