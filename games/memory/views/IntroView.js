(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;
    s.START_EASY = "startEasy";
    s.START_HARD = "startHard";

    var p = {};
    p.container = null;

    p.title = null;
    p.easyBtn = null;
    p.hardBtn = null;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call();
        s.Instance = this;

        this.title = new scope.Container();
        this.easyBtn = new scope.Container();
        this.hardBtn = new scope.Container();
        this.easyBtn.addEventListener("click", this._onEasyClick.bind(this));
        this.hardBtn.addEventListener("click", this._onHardClick.bind(this));

        this.container.addChild(this.title);
        this.container.addChild(this.easyBtn);
        this.container.addChild(this.hardBtn);

        var stageWidth = scope.ViewManager.Stage.stageWidth;
        var stageHeight = scope.ViewManager.Stage.stageHeight;

        var buttonWidth = stageWidth * 2 / 3;
        var buttonHeight = stageHeight / 8;

        this.title.x = (stageWidth - this.title.width) / 2;
        this.title.y = stageHeight / 4;

        this.easyBtn.x = (stageWidth - this.easyBtn.width) / 2;
        this.easyBtn.y = stageHeight / 2;

        this.hardBtn.x = (stageWidth - this.hardBtn.width) / 2;
        this.hardBtn.y = stageHeight * 3 / 4;
    };

    p._onEasyClick = function () {
        this.trigger(s.START_EASY);
    };

    p._onHardClick = function () {
        this.trigger(s.START_HARD);
    };

    scope.IntroView = scope.AbstractView.extends(p, s);

}(window));
