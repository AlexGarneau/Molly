(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;

    s.INTRO_TITLE = "games/memory/assets/images/MollyTitle.png";
    s.INTRO_BG = "games/memory/assets/images/MollyCircle.png";
    s.INTRO_MOLLY = "games/memory/assets/images/MollyPigBKG.png";

    s.START_EASY = "startEasy";
    s.START_HARD = "startHard";

    var p = {};
    p.container = null;

    p.background = null;
    p.bgMolly = null;
    p.title = null;
    p.easyBtn = null;
    p.hardBtn = null;
    p.instructionsBtn = null;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call(this);
        scope.IntroView.Instance = this;

        var stageWidth = scope.ViewManager.Stage.canvas.width;
        var stageHeight = scope.ViewManager.Stage.canvas.height;

        this.background = new createjs.Bitmap(s.INTRO_BG);
        this.bgMolly = new createjs.Bitmap(s.INTRO_MOLLY);
        this.title = new createjs.Bitmap(s.INTRO_TITLE);
        this.subtitle = new createjs.Text("MEMORY GAME", "80px Ostrich", "#F01010");

        this.poweredText = new createjs.Text("POWERED BY CREATEJS - AUDIO FROM FLASHKIT", "20px Ostrich", 0);

        this.poweredText.x = 30;
        this.poweredText.y = (stageHeight - this.poweredText.getMeasuredHeight() - 30);

        this.easyBtn = new scope.Button("LEVEL 1");
        this.hardBtn = new scope.Button("LEVEL 2");
        this.easyBtn.on(scope.Button.CLICKED, this._onEasyClick.bind(this));
        this.hardBtn.on(scope.Button.CLICKED, this._onHardClick.bind(this));

        this.instructionsBtn = new scope.Button("HELP");
        this.instructionsBtn.on(scope.Button.CLICKED, this._onInstructionsClick.bind(this));

        this.container.addChild(this.background, this.bgMolly, this.title, this.subtitle, this.poweredText, this.easyBtn.container, this.hardBtn.container, this.instructionsBtn.container);

        var buttonWidth = stageWidth * 2 / 3;
        var buttonHeight = stageHeight / 8;

        this.title.x = 0; //(stageWidth - this.title.image.width) / 2;
        this.title.y = -stageHeight / 8;

        this.subtitle.textAlign = "center";
        this.subtitle.x = (stageWidth - this.subtitle.getMeasuredWidth());
        this.subtitle.y = stageHeight * 11 / 32;

        this.easyBtn.container.x = stageWidth / 8;
        this.hardBtn.container.x = stageWidth / 8;
        this.instructionsBtn.container.x = stageWidth / 8;

        var buttonY = stageHeight - this.instructionsBtn.bg_up.image.height - 70;
        this.instructionsBtn.container.y = buttonY;
        buttonY -= this.hardBtn.height + 10;
        this.hardBtn.container.y = buttonY;
        buttonY -= this.easyBtn.height + 10;
        this.easyBtn.container.y = buttonY;
    };

    p._onEasyClick = function () {
        this.trigger(s.START_EASY);
    };

    p._onHardClick = function () {
        this.trigger(s.START_HARD);
    };

    p._onInstructionsClick = function () {
        this.trigger(s.START_INSTRUCTIONS);
    };

    scope.IntroView = scope.AbstractView.extend(p, s);

}(window));
