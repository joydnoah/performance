// init controller
var controller = new ScrollMagic.Controller();

// build scenes
new ScrollMagic.Scene({
	triggerElement: '#create-form-container',
	triggerHook: 0,
	offset: 0
	})
	.setClassToggle("#create-buttons-bar", "magic-scroll") // add .addIndicators() to check trigger position
	.addTo(controller);

