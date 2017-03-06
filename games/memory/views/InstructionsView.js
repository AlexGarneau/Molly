(function (scope) {
    "use strict";

    var s = {};
    s.Instance = null;
    s.BACK = "back";
    s.INTRUCTIONS_1 = "games/memory/assets/images/Molly1.png";
    s.INTRUCTIONS_2 = "games/memory/assets/images/Molly2.png";
    s.INTRUCTIONS_3 = "games/memory/assets/images/Molly3.png";
    s.INTRUCTIONS_4 = "games/memory/assets/images/Molly4.png";

    var p = {};
    p.container = null;

    p.background = null;

    p.page1 = null;
    p.page2 = null;
    p.page3 = null;
    p.page4 = null;

    p.image1 = null;
    p.image2 = null;
    p.image3 = null;
    p.image4 = null;

    p.label1 = null;
    p.label2 = null;
    p.label3 = null;
    p.label4 = null;

    p.card1 = null;
    p.card2 = null;
    p.card3 = null;
    p.card4 = null;
    p.card5 = null;
    p.card6 = null;

    p.backBtn = null;

    p._pages = null;
    p._pageIndex = 0;

    p.initialize = function (mode) {
        scope.AbstractView.prototype.initialize.call(this);
        scope.InstructionsView.Instance = this;

        var stageWidth = scope.ViewManager.Stage.canvas.width;
        var stageHeight = scope.ViewManager.Stage.canvas.height;

        var graphics = new createjs.Graphics();
        graphics.beginRadialGradientFill(["#50B0DF", "#30A0BF"], [0, 1], -stageWidth, -stageHeight, 1, stageWidth * 2, stageHeight * 2, stageWidth + stageHeight);
        graphics.drawRect(0, 0, stageWidth, stageHeight);
        this.background = new createjs.Shape(graphics);
        this.container.addChild(this.background);

        this.page1 = new createjs.Container();
        this.page2 = new createjs.Container();
        this.page3 = new createjs.Container();
        this.page4 = new createjs.Container();
        this._pages = [this.page1, this.page2, this.page3, this.page4];

        this.backBtn = new scope.Button("BACK");
        this.container.addChild(this.backBtn.container);
        this.backBtn.container.x = 30;
        this.backBtn.container.y = stageHeight - this.backBtn.height - 30;
        this.backBtn.on(scope.Button.CLICKED, this._onBackClick.bind(this));

        this.prevBtn = new scope.Button("", scope.Button.TYPE_ARROW);
        this.prevBtn.setScaleX(-1);
        this.nextBtn = new scope.Button("", scope.Button.TYPE_ARROW);
        this.prevBtn.on(scope.Button.CLICKED, this._onPrevClick.bind(this));
        this.nextBtn.on(scope.Button.CLICKED, this._onNextClick.bind(this));

        this.prevBtn.container.x = 30 + this.backBtn.width + 30 + this.prevBtn.width;
        this.nextBtn.container.x = stageWidth - this.nextBtn.width - 30;
        this.prevBtn.container.y = this.nextBtn.container.y = stageHeight - (this.backBtn.height + this.prevBtn.height) / 2;

        this._pageIndex = 0;
        this.container.addChild(this.nextBtn.container, this.page1);

        var c1 = this.card1 = new scope.Card(scope.Card.IMAGE_2, 140, 190);
        var c2 = this.card2 = new scope.Card(scope.Card.IMAGE_2, 140, 190);
        var c3 = this.card3 = new scope.Card(scope.Card.IMAGE_3, 140, 190);
        var c4 = this.card4 = new scope.Card(scope.Card.IMAGE_3, 140, 190);
        c1.setState(scope.Card.STATE_HIDDEN);
        c2.setState(scope.Card.STATE_HIDDEN);
        c3.setState(scope.Card.STATE_HIDDEN);
        c4.setState(scope.Card.STATE_HIDDEN);
        c1.container.x = c3.container.x = stageWidth - 280 - 60;
        c2.container.x = c4.container.x = stageWidth - 140 - 30;
        c1.container.y = c2.container.y = 260;
        c3.container.y = c4.container.y = 480;

        this.container.addChild(c1.container, c2.container, c3.container, c4.container);

        /*var image = this.image1 = new createjs.Bitmap(s.INTRUCTIONS_1);
        image.x = stageWidth - image.image.width + 100;
        image.y = (stageHeight - image.image.height) / 4;*/
        var label = this.label1 = new createjs.Text("Welcome to Molly's Memory Game !", "60px Ostrich", "#000000");
        label.x = stageWidth / 10;
        label.y = stageHeight / 3;
        label.lineWidth = stageWidth / 3;
        label.lineHeight = 50;

        this.page1.addChild(label);
        //this.page1.addChild(image, label);

        /*image = this.image2 = new createjs.Bitmap(s.INTRUCTIONS_2);
        image.x = stageWidth - image.image.width + 100;
        image.y = (stageHeight - image.image.height) / 4;*/
        label = this.label2 = new createjs.Text("Click a card to flip it over !", "60px Ostrich", "#000000");
        label.x = stageWidth / 10;
        label.y = stageHeight / 3;
        label.lineWidth = stageWidth / 3;
        label.lineHeight = 50;

        this.page2.addChild(label);
        //this.page2.addChild(image, label);

        /*image = this.image3 = new createjs.Bitmap(s.INTRUCTIONS_3);
        image.x = stageWidth - image.image.width + 100;
        image.y = (stageHeight - image.image.height) / 4;*/
        label = this.label3 = new createjs.Text("Try to find its matching partner !", "60px Ostrich", "#000000");
        label.x = stageWidth / 10;
        label.y = stageHeight / 3;
        label.lineWidth = stageWidth / 3;
        label.lineHeight = 50;

        this.page3.addChild(label);
        //this.page3.addChild(image, label);

        /*image = this.image4 = new createjs.Bitmap(s.INTRUCTIONS_4);
        image.x = stageWidth - image.image.width + 100;
        image.y = (stageHeight - image.image.height) / 4;*/
        label = this.label4 = new createjs.Text("You win if you can find them all !", "60px Ostrich", "#000000");
        label.x = stageWidth / 10;
        label.y = stageHeight / 3;
        label.lineWidth = stageWidth / 3;
        label.lineHeight = 50;

        this.page4.addChild(label);
        //this.page4.addChild(image, label);
    };

    p.reset = function () {
      this._pageIndex = 0;
      this.container.removeChild(this.prevBtn.container);
      this.container.addChild(this.nextBtn.container);
      this._updatePageStates();
    }

    p._onPrevClick = function () {
        this._pageIndex--;
        if (this._pageIndex <= 0) {
          this._pageIndex = 0;
          this.container.removeChild(this.prevBtn.container);
        } else {
          this.container.addChild(this.nextBtn.container);
        }

        this._updatePageStates();
    };

    p._onNextClick = function () {
      this._pageIndex++;
      if (this._pageIndex >= this._pages.length - 1) {
        this._pageIndex = this._pages.length - 1;
        this.container.removeChild(this.nextBtn.container);
      } else {
        this.container.addChild(this.prevBtn.container);
      }

      this._updatePageStates();
    };

    p._updatePageStates = function () {
      for (var i = this._pages.length - 1; i >= 0; i--) {
        if (i == this._pageIndex) {
          this.container.addChild(this._pages[i]);
        } else {
          this.container.removeChild(this._pages[i]);
        }
      }

      switch (this._pageIndex) {
        case 0:
          this.card1.setState(scope.Card.STATE_HIDDEN);
          this.card2.setState(scope.Card.STATE_HIDDEN);
          this.card3.setState(scope.Card.STATE_HIDDEN);
          this.card4.setState(scope.Card.STATE_HIDDEN);
          break;
        case 1:
          this.card1.setState(scope.Card.STATE_SHOW);
          this.card2.setState(scope.Card.STATE_HIDDEN);
          this.card3.setState(scope.Card.STATE_HIDDEN);
          this.card4.setState(scope.Card.STATE_HIDDEN);
          break;
        case 2:
          this.card1.setState(scope.Card.STATE_SHOW);
          this.card2.setState(scope.Card.STATE_SHOW);
          this.card3.setState(scope.Card.STATE_HIDDEN);
          this.card4.setState(scope.Card.STATE_HIDDEN);
          break;
        case 3:
          this.card1.setState(scope.Card.STATE_SHOW);
          this.card2.setState(scope.Card.STATE_SHOW);
          this.card3.setState(scope.Card.STATE_SHOW);
          this.card4.setState(scope.Card.STATE_SHOW);
          break;
      }
    };

    p._onBackClick = function () {
        this.trigger(s.BACK);
    };

    scope.InstructionsView = scope.AbstractView.extend(p, s);

}(window));
