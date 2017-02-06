(function (scope) {
    "use strict";

    var s = {};
    
    s.icon = "assets/images/icon.png";

    var p = {};

    p.buttonGameDressup = null;
    p.buttonGameMemory = null;

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call();
    };

    p.loadAssets = function (assets) {

    }

    p.onFileComplete = function (e) {

    }

    p.onFullComplete = function (e) {

    }

    scope.Loader = scope.AbstractView.extend(p, s);

}(window));
