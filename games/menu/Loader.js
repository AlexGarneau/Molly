(function (scope) {
    "use strict";

    var s = {};

    s.LOAD_FILE = "loadFile";
    s.LOAD_COMPLETE = "loadComplete";

    var p = {};
    p.loadText = null;

    p.initialize = function () {
        scope.AbstractView.prototype.initialize.call(this);
    };

    /** Loads a string of asset urls. */
    p.loadAssets = function (assets) {
        this.loadText = new createjs.Text("Loading...", "64px Ostrich", 0);
        this.container.addChild(this.loadText);
        this.loadText.x = (scope.ViewManager.Stage.canvas.width - this.loadText.getMeasuredWidth()) / 2;
        this.loadText.y = (scope.ViewManager.Stage.canvas.height - this.loadText.getMeasuredHeight()) / 2;

        for (var i = assets.length - 1; i >= 0; i--) {
          if (assets[i].type == "sound") {
            createjs.Sound.registerSound(assets[i].src, assets[i].id, 2);
          }
        }

        var loadQueue = new createjs.LoadQueue(false);
        loadQueue.on("fileload", this.onFileComplete, (this));
        loadQueue.on("complete", this.onFullComplete, (this));
        loadQueue.loadManifest(assets);
    }

    p.onFileComplete = function (e) {
        this.trigger(s.LOAD_FILE, e);
    }

    p.onFullComplete = function (e) {
        this.trigger(s.LOAD_COMPLETE);
        this.reset();
    }

    scope.Loader = scope.AbstractView.extend(p, s);

}(window));
