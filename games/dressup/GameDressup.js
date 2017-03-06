(function (scope) {
    "use strict";

    var s = {};

    s.ASSETS = [

    ];

    var p = {};

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call(this);
    };

    scope.GameDressup = scope.AbstractView.extend(p, s);

}(window));
