(function () {
	APP.modules = APP.modules || {};

	APP.modules.animation = {

		initAnimation: function () {
            console.log("init animation");

             var controller = new ScrollMagic.Controller({
                vertical: false,
            });

            

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-1", 
                triggerHook: "onLeave",
                duration: '125%',
                offset: $(window).width()/10*4
            })
                .setTween(".section-1", {left:"25%",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-2", 
                triggerHook: "onLeave",
                duration: '125%'
            })
                .setTween(".section-2", {left:"25%",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-3", 
                triggerHook: "onLeave",
                duration: '125%'
            })
                .setTween(".section-3", {left:"25%",ease: Linear.easeNone}) 
                .addTo(controller);


            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-1", 
                triggerHook: "onLeave",
                duration: '60%',
            })
                .setTween(".section-1__background", {width:"155vw",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-2", 
                triggerHook: "onEnter",
                duration: '150%',
                offset: $(window).width()/2
            })
                .setTween(".bouger__background", {left:"0%",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-2", 
                triggerHook: "onEnter",
                duration: '100%',
                offset: $(window).width()/2
            })
                .setTween(".bouger__cloud1", {left:"-5%",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-2", 
                triggerHook: "onEnter",
                duration: '100%',
                offset: $(window).width()/2
            })
                .setTween(".bouger__cloud2", {left:"60%",ease: Linear.easeNone}) 
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-3", 
                triggerHook: 0.1
            })
                .setClassToggle(".videos__btn", "visible")
                
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-4", 
                triggerHook: 0.1
            })
                .setClassToggle(".jeu__top--start__square-1", "jeu__top--start__square-1--rotate")
                
                .addTo(controller);

            var scene = new ScrollMagic.Scene({
                triggerElement: "#section-4", 
                triggerHook: "onEnter",
                duration: '100%',
            })
                 .setTween(".jeu__top--start", {backgroundPosition:'13% center', ease: Linear.easeNone}) 
                
                .addTo(controller);
		}
	};
	var self = APP.modules.animation;
})();  