(function (scope) {
    "use strict";

    var s = {};

    s.MENU = "menu";
    s.LOADER = "loader";
    s.INTRO_DRESSUP = "introDressup";
    s.GAME_DRESSUP = "gameDressup";
    s.GAME_MEMORY = "gameMemory";

    s.Instance = null;
    s.Stage = null;
    s.icon = "/assets/images/icon.png";

    s.DEBUG_CHECK = function (container, index = 0) {
      var string = "";
      for (var i = 0; i < index; i++) {
        string += "- ";
      }

      if (container.children && container.children.length) {
        for (var j = 0; j < container.children.length; j++) {
          scope.ViewManager.DEBUG_CHECK(container.children[j], index+1);
        }
      }
    }

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
        // console.log("Starting the ViewManager.");

        scope.ViewManager.Instance = this;
        scope.ViewManager.Stage = stage;
        this.stage = stage;
        stage.enableMouseOver(10);

        this.menu = new scope.Menu();
      	this.loader = new scope.Loader();
        this.loader.on(scope.Loader.LOAD_COMPLETE, this._viewLoadComplete.bind(this));

        //this.introCutsceneDressup = new IntroCutsceneDressup();
        //this.gameDressup = new GameDressup();

        this.allViews = [this.menu, this.loader, this.gameMemory];
        //this.allViews = [this.menu, this.loader, this.introCutsceneDressup, this.gameDressup, this.gameMemory];

        // Initial view. For now, start with the Memory Game, as it's the only game there is.
        this.showView(s.GAME_MEMORY);
    };

    p.showView = function (view) {
        for (var i = this.allViews - 1; i >= 0; i--) {
            if (this.stage.hasChild(this.allViews[i].container)) {
                this.stage.removeChild(this.allViews[i].container);
            }
        }

        switch (view) {
            case s.MENU:
              this.stage.addChild(this.menu.container);
              break;
            case s.LOADER:
              this.stage.addChild(this.loader.container);
              break;
            case s.INTRO_DRESSUP:
              this._viewTarget = s.INTRO_DRESSUP;
              this.stage.addChild(this.introCutsceneDressup.container);
              break;
            case s.GAME_DRESSUP:
              this._viewTarget = s.GAME_DRESSUP;
              this.stage.addChild(this.loader.container);
              this.loader.loadAssets([].concat(scope.GameDressup.ASSETS, scope.Sounds.getSoundManifest(s.GAME_DRESSUP)));
              break;
            case s.GAME_MEMORY:
              this._viewTarget = s.GAME_MEMORY;
              this.stage.addChild(this.loader.container);
              this.loader.loadAssets([].concat(scope.GameMemory.ASSETS, scope.Sounds.getSoundManifest(s.GAME_MEMORY)));
              break;
            default: break;
        }
    };

    p._viewTarget = null;
    p._viewLoadComplete = function () {
        var viewTarget;
        if (this._viewTarget == s.GAME_MEMORY) {
          viewTarget = this.gameMemory = new GameMemory();
          this.stage.removeChild(this.loader.container);
          this.stage.addChild(viewTarget.container);
          viewTarget.start();
        }
    }

    scope.ViewManager = Backbone.View.extend(p, s);

}(window));
