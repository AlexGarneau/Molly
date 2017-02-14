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

    p.reset = function () {
      this.container.empty();
    }

    scope.AbstractView = Backbone.View.extends(p, s);

}(window));
