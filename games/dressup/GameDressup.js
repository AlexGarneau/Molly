(function (scope) {
    "use strict";

    var s = {};

    s.Instance = null;
    s.icon = "assets/images/icon.png";

    var p = {};
    p.initialize = function () {
        s.Instance = this;
    };

    scope.GameDressup = Backbone.View.extends(p, s);

}(window));
