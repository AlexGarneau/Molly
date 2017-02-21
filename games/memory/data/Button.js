(function (scope) {
    "use strict";

    var s = {};
    s.CLICKED = "clicked";

    s.BUTTON_BG_UP = "games/memory/assets/images/ButtonUp.png";
    s.BUTTON_BG_OVER = "games/memory/assets/images/ButtonOver.png";
    s.BUTTON_BG_DOWN = "games/memory/assets/images/ButtonDown.png";

    var p = {
          get width() {
            return this.bg_up ? this.bg_up.image.width : 0;
          },
          set width(value) {
            if (this.bg_up) {
              this.bg_up.image.width = value;
              this.bg_over.image.width = value;
              this.bg_down.image.width = value;
              this.label.x = (value - this.label.textWidth) / 2;
            }
          },
          get height() {
            return this.bg_up ? this.bg_up.image.height : 0;
          },
          set height(value) {
            if (this.bg_up) {
              this.bg_up.image.height = value;
              this.bg_over.image.height = value;
              this.bg_down.image.height = value;
              this.label.y = (this.bg_up.height - this.label.textHeight) / 2;
            }
          }
    };

    p.container = null;

    p.bg_up = null;
    p.bg_over = null;
    p.bg_down = null;
    p.label = null;

    p._isOver = false;

    p.initialize = function (text) {
        scope.Button.Instance = this;
        this.container = new createjs.Container();
        this.bg_up = new createjs.Bitmap(s.BUTTON_BG_UP);
        this.bg_over = new createjs.Bitmap(s.BUTTON_BG_OVER);
        this.bg_down = new createjs.Bitmap(s.BUTTON_BG_DOWN);
        this.label = new createjs.Text(text, "40px Ostrich", 0);

        this.container.addEventListener("mousedown", this._onDown.bind(this));
        this.container.addEventListener("mouseout", this._onOut.bind(this));
        this.container.addEventListener("mouseover", this._onOver.bind(this));
        this.container.addEventListener("click", this._onClick.bind(this));

        this.container.addChild(this.bg_up, this.bg_over, this.bg_down, this.label);

        this.label.set({
          textAlign: "center",
          textBaseline: "middle",
          x: this.bg_up.image.width / 2,
          y: this.bg_up.image.height / 2
        });
    };

    p._onOver = function () {
        this.bg_up.alpha = 0;
        this.bg_over.alpha = 1;
        this.bg_down.alpha = 0;
        this._isOver = true;
    };
    p._onOut = function () {
        this.bg_up.alpha = 1;
        this.bg_over.alpha = 0;
        this.bg_down.alpha = 0;
        this._isOver = false;
    };
    p._onDown = function () {
        this.bg_up.alpha = 0;
        this.bg_over.alpha = 0;
        this.bg_down.alpha = 1;
    };
    p._onClick = function () {
        this.trigger(s.CLICKED);
        this.bg_up.alpha = this._isOver ? 0 : 1;
        this.bg_over.alpha = this._isOver ? 1 : 0;
        this.bg_down.alpha = 1;
    };

    scope.Button = Backbone.View.extend(p, s);

}(window));
