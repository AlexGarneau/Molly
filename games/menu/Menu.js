(function (scope) {
    "use strict";

    var s = {};
    s.icon = "assets/images/icon.png";

    var p = {};

    p.buttonGameDressup = null;
    p.buttonGameMemory = null;

    p.initialize  = function () {

    };

    scope.Menu = Backbone.View.extends(p, s);

}(window));
