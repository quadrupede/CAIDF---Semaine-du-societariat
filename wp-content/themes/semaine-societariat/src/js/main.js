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