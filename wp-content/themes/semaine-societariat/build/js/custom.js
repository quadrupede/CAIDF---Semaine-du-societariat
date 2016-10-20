var APP = {};

(function() {
    APP = {
        /**
         * Initialise l'application
         */
        timerHelp: null,

        initialize: function() {
        	console.log("app initialized");
        },
        /**
         * 
         *  toutes les pages via $().ready
         */
        initPage: function() {
        	console.log("page loaded");
            var md = new MobileDetect(window.navigator.userAgent);

            if ((!md.phone()) && ($('.home').length)) {
                $('html').width($(window).width()*3);
                $('body').width($(window).width()*3);
            }
            console.log($(window).width() / $(window).height());
            if ($(window).width() / $(window).height() < 1.5) {
                $('body').addClass('portrait');
            }

            if ((!md.tablet()) && (!md.phone()) && ($('.home').length)) {
                $('body').addClass('no-touch');
                self.modules.animation.initAnimation();
                $("body").mousewheel(function(evt, chg) {
                    this.scrollLeft -= (chg * 30); //need a value to speed up the change
                    evt.preventDefault();
                    clearTimeout(self.timerHelp);
                    $('.section-1__left__content__help').addClass('hidden');
                });
                 self.timerHelp = setTimeout(self.displayHelp, 10000);
            }

            self.modules.jeu.initJeu();

            $('.videos__videos').slick();

            $('.section-1__left__content__btn').click(self.scrollToLeft);

            self.initPopin();
            

            $('body').imagesLoaded(self.setVideos);
            $('body').imagesLoaded(self.getUrlInfos);
        },

        initPopin: function() {
            $('.agence__adresse').each(function() {
                $(this).slideUp(0);
            })
            $('.agence h4').click(function() {
                $('.agence__adresse').each(function() {
                    $(this).slideUp(600);
                })
                $(this).parent().find('.agence__adresse').slideDown(600);
            });
            $('.section-1__right__content__btn').click(self.openPopin);
            $('.popin-agences__background').click(self.closePopin);
        },

        openPopin: function() {
            $('.popin-agences').removeClass('hidden');
            $('.popin-agences__background').removeClass('hidden');
        },

        closePopin: function() {
            $('.popin-agences').addClass('hidden');
            $('.popin-agences__background').addClass('hidden');
        },

        getUrlInfos: function() {
            var getData = window.location.hash;

            getData = getData.split("#")[1];
            console.log('getData = '+getData);
            if (getData == 'jeu') {
                console.log('getData 2 = '+getData);
                $('html,body').scrollLeft($(window).width()*10);
            }
        },

        setVideos: function () {
            $('.videos__video iframe').each(function(i) {
                var videoIframe = this;
                setTimeout(function(){ 
                    $(videoIframe).attr('src', $(videoIframe).attr('data-src')); 
                }, i*500);
            })
        },

        scrollToLeft: function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollLeft: $('#section-1').width() - $(window).width()+20
            }, 600, 'easeInOutCubic'); 
            clearTimeout(self.timerHelp);
        },

        displayHelp: function() {
            $('.section-1__left__content__help').removeClass('hidden');
        }
    };

    var self = APP;
})();
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
(function () {
	APP.modules = APP.modules || {};

	APP.modules.jeu = {
        currentScreen: 0,
        currentWord: '',
        timerHelp: null,

		initJeu: function () {
            console.log("init jeu");
            self.initScreen();
            $('.jeu__bottom--start__btn').click(self.nextScreen);
            
		},

        initScreen: function() {
            console.log('init screen');
            var j = 0;
            $('.jeu--ecrans').each(function() {
                j++;
                var word = $(this).attr('data-word');
                for (var i = 0; i < word.length; i++) {
                    if (word.charAt(i) != ' ' ) {
                        $(this).find('.jeu__bottom__letters').append('<div class="jeu__bottom__letter"><input class="jeu__bottom__letter__input jeu--'+j+'__bottom__letter__input--'+i+'" type="text"  maxlength="1" data-num="'+i+'" data-letter="'+word.charAt(i)+'"></div>');
                    }else{
                        $(this).find('.jeu__bottom__letters').append('<div class="jeu__bottom__letter jeu__bottom__letter--space" data-letter="'+word.charAt(i)+'"><input class="jeu__bottom__letter__input jeu--'+j+'__bottom__letter__input--'+i+' jeu__bottom__letter__input--space" type="text" value="'+word.charAt(i)+'" disabled="true" maxlength="1" data-num="'+i+'" data-letter="'+word.charAt(i)+'"></div>');
                    }
                }
            });

            
            $('.jeu__bottom__letter__input').focus(self.onInputFocus);
            $('.jeu__bottom__btn--indice').click(self.showIndice);
        },

        showIndice: function() {
            $(this).addClass('hidden');
            $(this).parent().find('.jeu__bottom__indice').removeClass('hidden');
        },

        onInputChange: function(e) {
            switch (e.keyCode) {
                case 32 :
                    $(this).val('');
                    break;
                default :
                    if ($(this).val() != '') {
                        var curInput = Number ($(this).attr('data-num'));
                        var nextInput = curInput+1;
                        while ($('.jeu--'+self.currentScreen+'__bottom__letter__input--'+nextInput).hasClass('jeu__bottom__letter__input--space')) {
                            nextInput++;
                        }
                        if ($('.jeu--'+self.currentScreen+'__bottom__letter__input--'+nextInput).length) {
                            $('.jeu--'+self.currentScreen+'__bottom__letter__input--'+nextInput).focus();
                            $(this).unbind('keyup');
                            $(this).unbind('keydown');
                        }
                        self.checkAnswer();
                        clearTimeout(self.timerHelp);
                    }
                    break;
            }
        },

        checkAnswer: function(e) {
            var allGood = true;
            for (var i = 0; i < self.currentWord.length; i++) {
                var letter = $('.jeu--'+self.currentScreen).find('.jeu--'+self.currentScreen+'__bottom__letter__input--'+i).val();

                if (self.currentWord.charAt(i) !=  letter) {
                   allGood = false;
                }
            }
            if (allGood) {
                self.nextScreen();
            }
        },

        onBackSpace: function(e) {
            if (e.keyCode == 8) {
                $(this).val('');
                var curInput = Number ($(this).attr('data-num'));
                if (curInput != 0) {
                    var prevInput = curInput-1;
                    while ($('.jeu--'+self.currentScreen+'__bottom__letter__input--'+prevInput).hasClass('jeu__bottom__letter__input--space')) {
                        prevInput--;
                    }
                
                    $('.jeu--'+self.currentScreen+'__bottom__letter__input--'+prevInput).focus();
                    $(this).unbind('keyup');
                    $(this).unbind('keydown');
                }
            }
        },

        onInputFocus: function() {
            $(this).val('');
            $(this).keyup(self.onInputChange);
            $(this).keydown(self.onBackSpace);
        },

        nextScreen: function() {
            console.log('start jeu');

            self.currentScreen++;

            $('.jeu--current').addClass('jeu--before');
            $('.jeu--current').removeClass('jeu--current');
            $('.jeu--'+self.currentScreen).removeClass('jeu--after');
            $('.jeu--'+self.currentScreen).addClass('jeu--current');
            if (!$('.jeu--'+self.currentScreen).hasClass('jeu--end')) {
                console.log($('.jeu--'+self.currentScreen).find('.jeu--'+self.currentScreen+'__bottom__letter__input--0'));
                $('.jeu--'+self.currentScreen).find('.jeu--'+self.currentScreen+'__bottom__letter__input--0').focus();
                self.currentWord = $('.jeu--'+self.currentScreen).attr('data-word');
            }

            self.timerHelp = setTimeout(self.displayHelp, 10000);
        },

        displayHelp: function() {
            $('.jeu__bottom__help').removeClass('hidden');
        }
	};
	var self = APP.modules.jeu;
})();  