(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;
    s.MODE_EASY = "easy";
    s.MODE_HARD = "hard";

    var p = {};
    p.container = null;
    p.mode = null;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call();
        s.Instance = this;
        this.container = new createjs.Container();
    };

    p.setupEasyMode = function () {
        for (var i = 0; i < 3; i++) {

        }
    }

    p.setupHardMode = function () {
        for (var i = 0; i < 6; i++) {

        }
    }

    p.reset = function () {
      this.container.empty();
    }

    scope.GameView = scope.AbstractView.extends(p, s);

}(window));
