(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;

    var p = {};
    p.container = null;

    p.initialize = function () {
        s.Instance = this;
        this.container = new createjs.Container();
    };

    scope.AbstractView = Backbone.View.extends(p, s);

}(window));
