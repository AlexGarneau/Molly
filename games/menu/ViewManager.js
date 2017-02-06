(function (scope) {
    "use strict";

    var s = {};

    s.MENU = "menu";
    s.LOADER = "loader";
    s.INTRO_DRESSUP = "introDressup";
    s.GAME_DRESSUP = "gameDressup";
    s.GAME_MEMORY = "gameMemory";

    s.Instance = null;
    s.icon = "assets/images/icon.png";

    var p = {};

    p.stage = null;
    p.allViews = [];

    // Games.
    p.gameDressup = null;
    p.gameMemory = null;

    // Other views.
    p.menu = null;
    p.loader = null;

    // Cutscenes
    p.introCutsceneDressup = null;

    p.initialize  = function (stage) {
        s.Instance = this;
        this.stage = stage;

        this.menu = new Menu();
      	this.loader = new Loader();
        this.introCutsceneDressup = new IntroCutsceneDressup();
        this.gameDressup = new GameDressup();
        this.gameMemory = new GameMemory();

        this.allViews = [this.menu, this.loader, this.introCutsceneDressup, this.gameDressup, this.gameMemory];
    };

    p.showView = function (view) {
        for (var i = this.allViews - 1; i >= 0; i--) {
            if (this.stage.hasChild(this.allViews[i].container) {
                this.stage.removeChild(this.allViews[i].container);
            }
        }

        switch (view) {
            case s.MENU:
              break;
            case s.LOADER:
              break;
            case s.INTRO_DRESSUP:
              break;
            case s.GAME_DRESSUP:
              break;
            case s.GAME_MEMORY:
              break;
            default: break;
        }
    };

    scope.ViewManager = Backbone.View.extends(p, s);

}(window));
