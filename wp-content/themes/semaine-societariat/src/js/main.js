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
            $('html').width($(window).width()*3);
            $('body').width($(window).width()*3);
            

            var md = new MobileDetect(window.navigator.userAgent);

            if ((!md.tablet()) && (!md.phone())) {
                self.modules.animation.initAnimation();
                $("body").mousewheel(function(evt, chg) {
                    this.scrollLeft -= (chg * 30); //need a value to speed up the change
                    evt.preventDefault();
                    clearTimeout(self.timerHelp);
                    $('.section-1__left__content__help').addClass('hidden');
                });
            }

            self.modules.jeu.initJeu();

            $('.videos__videos').slick();

            $('.section-1__left__content__btn').click(self.scrollToLeft);

           
           // $('body').imagesLoaded(self.setVideos);
            $('body').imagesLoaded(self.getUrlInfos);
            
            self.timerHelp = setTimeout(self.displayHelp, 5000);
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
                scrollLeft: $(window).width()/10*4+20
            }, 600, 'easeInOutCubic'); 
            clearTimeout(self.timerHelp);
            $('.section-1__left__content__help').addClass('hidden');
        },

        displayHelp: function() {
            $('.section-1__left__content__help').removeClass('hidden');
        }
    };

    var self = APP;
})();