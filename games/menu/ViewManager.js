(function (scope) {
    "use strict";

    var s = {};

    s.MENU = "menu";
    s.LOADER = "loader";
    s.INTRO_DRESSUP = "introDressup";
    s.GAME_DRESSUP = "gameDressup";
    s.GAME_MEMORY = "gameMemory";

    s.Instance = null;
    s.games = [GameDressup, GameMemory];
    s.icon = "assets/images/icon.png";

    var p = {};

    // Other views.
    p.menu = null;
    p.loader = null;

    // Cutscenes
    p.introCutsceneDressup = null;

    p.initialize  = function () {
        s.Instance = this;

        this.menu = new Menu();
      	this.loader = new Loader();
        this.introCutsceneDressup = new IntroCutsceneDressup();
    };

    p.showView = function (view) {
        
    };

    scope.ViewManager = Backbone.View.extends(p, s);

}(window));
