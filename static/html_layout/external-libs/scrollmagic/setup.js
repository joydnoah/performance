// init controller
var controller = new ScrollMagic.Controller();

// build scenes
new ScrollMagic.Scene({
	triggerElement: '#body-container',
	triggerHook: 0,
	offset: 60
})
.setClassToggle("#topbar", "magic-scroll") // add .addIndicators() to check trigger position
.addTo(controller);