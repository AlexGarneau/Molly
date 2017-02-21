var mainStage;
var viewManager = null;

$(document).ready( function($) {
	mainStage = new createjs.Stage(document.getElementById("MainStage"));

	// Everything happens in the view manager.
	viewManager = new ViewManager(mainStage);

	createjs.Ticker.interval = 1;
	createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
	createjs.Ticker.addEventListener("tick", window.tick);

}, false);

window.tick = function (e) {
	mainStage.update();
}
