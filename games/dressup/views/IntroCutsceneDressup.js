(function (scope) {
    "use strict";

    var s = {};

    s.COMPLETE = "complete";

    var p = {};

    p.initialize = function () {
         scope.AbstractView.prototype.initialize.call();
    };

    p.start = function () {

    };

    p._finish = function () {
        this.trigger(s.COMPLETE);
    };

    scope.IntroCutsceneDressup = scope.AbstractView.extend(p, s);

}(window));
