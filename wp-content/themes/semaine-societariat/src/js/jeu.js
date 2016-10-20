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