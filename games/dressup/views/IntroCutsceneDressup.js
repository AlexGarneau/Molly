(function (scope) {
    "use strict";

    var s = {};

    s.COMPLETE = "complete";
    s.Instance = null;

    var p = {};
    p.initialize = function () {
        s.Instance = this;
    };

    p.start = function () {

    };

    p._finish = function () {
        this.trigger(s.COMPLETE);
    };

    scope.IntroCutsceneDressup = Backbone.View.extends(p, s);

}(window));
