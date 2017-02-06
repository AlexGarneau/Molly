(function (scope) {
    "use strict";

    var s = {};

    s.icon = "assets/images/icon.png";

    var p = {};

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call();
    };

    scope.GameDressup = scope.AbstractView.extend(p, s);

}(window));
