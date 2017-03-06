(function (scope) {
    "use strict";

    var s = {};
    s.CLICKED = "clicked";
    s.TYPE_BOX = "button_type_box";
    s.TYPE_ARROW = "button_type_arrow";

    s.BUTTON_BG_UP = "games/memory/assets/images/ButtonUp.png";
    s.BUTTON_BG_OVER = "games/memory/assets/images/ButtonOver.png";
    s.BUTTON_BG_DOWN = "games/memory/assets/images/ButtonDown.png";

    s.BUTTON_ARROW_UP = "games/memory/assets/images/ThickArrowUp.png";
    s.BUTTON_ARROW_OVER = "games/memory/assets/images/ThickArrowUp.png";
    s.BUTTON_ARROW_DOWN = "games/memory/assets/images/ThickArrowDown.png";

    var p = {};

    p.container = null;

    p.bg_up = null;
    p.bg_over = null;
    p.bg_down = null;
    p.label = null;
    p.cover = null;
    p.coverContainer = null;

    p.width = 0;
    p.height = 0;
    p.scaleX = 1;

    p._isOver = false;

    p._boxScale = 0.8;

    p.initialize = function (text, type = s.TYPE_BOX) {
        this.container = new createjs.Container();

        // TODO: Make buttons more solid red and box buttons about 80% size

        this.label = new createjs.Text(text, "40px Ostrich", 0);
        this.coverContainer = new createjs.Container();

        // Cover is for receiving the mouse click.
        this.cover = new createjs.Shape();
        this.coverContainer.addChild(this.cover);

        if (type == s.TYPE_ARROW) {
          this.bg_up = new createjs.Bitmap(s.BUTTON_ARROW_OVER);
          this.bg_over = new createjs.Bitmap(s.BUTTON_ARROW_OVER);
          this.bg_down = new createjs.Bitmap(s.BUTTON_ARROW_DOWN);
          this.width = this.bg_up.image.width;
          this.height = this.bg_up.image.height;
        } else {
          this.bg_up = new createjs.Bitmap(s.BUTTON_BG_OVER);
          this.bg_over = new createjs.Bitmap(s.BUTTON_BG_OVER);
          this.bg_down = new createjs.Bitmap(s.BUTTON_BG_DOWN);
          this.bg_up.scaleX = this._boxScale;
          this.bg_over.scaleX = this._boxScale;
          this.bg_down.scaleX = this._boxScale;
          this.setWidth(this.bg_up.image.width);
          this.setHeight(this.bg_up.image.height);
        }

        this.bg_up.filters = [new createjs.ColorFilter(1, 0.5, 0.5, 1)];
        this.bg_up.cache(0, 0, this.width, this.height);

        this.coverContainer.addEventListener("mousedown", this._onDown.bind(this));
        this.coverContainer.addEventListener("mouseout", this._onOut.bind(this));
        this.coverContainer.addEventListener("mouseover", this._onOver.bind(this));
        this.coverContainer.addEventListener("click", this._onClick.bind(this));

        this.container.addChild(this.bg_up, this.bg_over, this.bg_down, this.label, this.coverContainer);

        this.bg_up.alpha = 1;
        this.bg_over.alpha = 0;
        this.bg_down.alpha = 0;

        this.label.set({
          textAlign: "center",
          textBaseline: "middle",
          x: this.width * this.bg_up.scaleX / 2,
          y: this.height * this.bg_up.scaleY / 2
        });
        this.cover.graphics.beginFill("rgba(0, 0, 0, 0.01)");
        this.cover.graphics.drawRect(0, 0, this.width, this.height);
    };

    p.setWidth = function (value) {
        if (this.bg_up) {
            this.bg_up.image.width = value;
            this.bg_over.image.width = value;
            this.bg_down.image.width = value;
            this.label.x = (value - this.label.textWidth) * this.bg_up.scaleX / 2;
            this.width = value;
        }
    },
    p.setHeight = function (value) {
        if (this.bg_up) {
            this.bg_up.image.height = value;
            this.bg_over.image.height = value;
            this.bg_down.image.height = value;
            this.label.y = (value - this.label.textHeight) * this.bg_up.scaleY / 2;
            this.height = value;
        }
    }
    p.setScaleX = function (value) {
        if (this.bg_up) {
            this.bg_up.scaleX = value;
            this.bg_over.scaleX = value;
            this.bg_down.scaleX = value;
            this.cover.scaleX = value;
            this.scaleX = value;
        }
    }

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
        this.bg_down.alpha = 0;
        scope.Sounds.playSound(scope.Sounds.MEMORY_SOUND_BUTTON);
    };

    scope.Button = Backbone.View.extend(p, s);

}(window));
