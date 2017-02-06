var mainStage;
var viewManager = null;

window.addEventListener("DOMContentLoaded", function() {
	mainStage = new createjs.Stage($("#MainStage"));

	viewManager = new ViewManager(mainStage);

}, false);
