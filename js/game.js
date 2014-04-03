(function() {
  var $body, $btnNo, $btnPlay, $btnYes, $comment, $gameover, $showContent, $showPoint, $timestamp, game, settings,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  settings = {
    limitTime: 60,
    countDown: 600,
    levels: {
      1: ['&#24050;&#35657;&#23526;&#26234;&#21830;&#33287;&#39340;&#33521;&#20061;&#30456;&#21516;', '&#22909;&#20102;&#65292;&#19979;&#21435;&#38936; 500', '&#20320;&#26159;&#40680;&#24037;？', '&#21152;&#27833;&#65292;&#22909;&#21966;&#65311;', '&#38632;&#20843; & &#20196;&#20992;'],
      5: ['&#20320;&#30340;&#20599;&#25078;&#23475;&#31435;&#27861;&#38498;&#22833;&#23432;&#20102;', '&#30333;&#34923;&#36557;&#25915;&#21218;&#22826;&#24375;&#65281;', '&#35531;&#27880;&#24847;&#21209;&#24517;&#36880;&#38988;&#23529;&#26597;&#65281;', '&#24555;&#37325;&#23529;&#65281;&#22283;&#26371;&#38656;&#35201;&#20320;&#65281;', '&#26377;&#27794;&#26377;&#36889;&#40636;&#24375;&#65311;&#27794;&#26377;&#65281;'],
      10: ['&#28034;&#26126;&#32681;&#25937;&#25588;&#20013;&#65281;', '&#20844;&#32893;&#26371;&#26377;&#36774;&#31561;&#26044;&#27794;&#36774;&#65281;', '&#33225;&#26360;&#34987;&#27298;&#33289;&#29031;&#29255;&#22826;&#37276;<br>&#29579;&#20553;&#24544;&#65306;&#35328;&#35486;&#38712;&#20940;!', '&#31179;&#24847;&#35469;&#28858;&#39321;&#34121;&#26681;&#26412;&#19981;&#37325;&#35201;', '&#25136;&#31070;&#23002;&#32769;&#24107;&#35258;&#24471;&#20320;&#36996;&#21487;&#20197;&#20877;&#24375;'],
      15: ['&#12300;&#20320;&#20497;&#19981;&#37197;&#30070;&#20013;&#22283;&#20154;&#12301;<br>&#30333;&#29436;&#35486;&#30050;&#65292;&#21700;&#22530;&#22823;&#31505;', '&#39340;&#27665;&#35519;&#21482;&#26377; 9%&#65292;<br>&#20294;&#27492;&#20998;&#25976;&#24050;&#36229;&#36942; 9% &#29609;&#23478;', '&#20808;&#31435;&#27861;&#65292;&#20877;&#23529;&#26597;&#19968;&#27425;&#65281;', '~~<a href="https://www.youtube.com/watch?v=yovi51Rqd3Q">&#27472;ver&#36023;&#29241;&#24052;&#24213;</a>~~'],
      20: ['&#20320;&#31478;&#29229;&#21147;&#36229;&#24375;&#65292;&#26681;&#26412;&#19981;&#38656;&#31805;&#26381;&#36031;', '&#36776;&#35672;&#24230;&#22570;&#31281;&#31998;&#23519;&#38538;', '&#20320;&#30340;&#20998;&#36776;&#21147;&#22826;&#39640;&#65292;&#20013;&#22825;&#37117;&#20570;&#19981;&#20102;&#20551;&#26032;&#32862;...', '&#20320;&#30340;&#20998;&#36776;&#21147;&#22826;&#39640;&#65292;TVBS &#37117;&#20570;&#19981;&#20102;&#20551;&#26032;&#32862;...'],
      999: ['&#26519;&#39131;&#24070;&#33287;&#38515;&#28858;&#24311;&#22312;&#19968;&#36215;&#65281;', '&#19981;&#21205;&#22914;&#23665;&#65292;&#26377;&#22914;&#37329;&#24179;', '&#20154;&#27665;&#37117;&#20687;&#20320;&#19968;&#27171;&#24375;&#23601;&#22909;&#20102;', '&#22823;&#23478;&#37117;&#20687;&#20320;&#36889;&#40636;&#24375;&#65292;&#21488;&#28771;&#26089;&#29544;&#31435;&#20102;', '&#20320;&#35657;&#23526;&#20102;&#26381;&#36031;&#25033;&#35442;&#35201;&#37325;&#23529;&#65281;', '&#20320;&#35657;&#26126;&#20102; Z < B']
    }
  };

  $body = $('body');

  $btnPlay = $('.play');

  $btnYes = $('.btn-yes');

  $btnNo = $('.btn-no');

  $timestamp = $('.timestamp');

  $comment = $('.comment');

  $showPoint = $('.showpoint');

  $showContent = $('.show-content');

  $gameover = $('.gameover');

  $.fn._bigtext = function() {
    return this.each(function() {
      var $el;

      $el = $(this);
      return $el.bigtext($el.data());
    });
  };

  game = (function() {
    function game() {
      this.no = __bind(this.no, this);
      this.yes = __bind(this.yes, this);
      this.play = __bind(this.play, this);
      this.keydown = __bind(this.keydown, this);      $('.bigtext')._bigtext();
      this.observe();
      this.reset();
    }

    game.prototype.reset = function() {
      this.time = settings.limitTime;
      this.point = 0;
      this.is_playing = false;
      return this.showTime(this.time);
    };

    game.prototype.observe = function() {
      $(document).on('keydown', this.keydown);
      $btnPlay.on('click', this.play);
      $btnYes.on('click', this.yes);
      return $btnNo.on('click', this.no);
    };

    game.prototype.keydown = function(e) {
      var key;

      key = e.which;
      switch (key) {
        case 37:
          return this.no();
        case 39:
          return this.yes();
        case 13:
          return this.play();
      }
    };

    game.prototype.play = function() {
      if (this.is_playing) {
        return;
      }
      this.is_playing = true;
      this.toggleBodyClass('play');
      this.getQuiz();
      this.countdown();
      clearTimeout(this.gameroverTimer);
      return $gameover.addClass('showGameOver');
    };

    game.prototype.yes = function() {
      if (!this.is_playing) {
        return;
      }
      if (this.is_anti) {
        return this.end();
      } else {
        return this.bingo();
      }
    };

    game.prototype.no = function() {
      if (!this.is_playing) {
        return;
      }
      if (this.is_anti) {
        return this.bingo();
      } else {
        return this.end();
      }
    };

    game.prototype.countdown = function() {
      var _this = this;

      if (this.time === 0) {
        return this.end();
      }
      if (!this.is_playing) {
        return;
      }
      this.showTime(this.time);
      this.time--;
      return this.timer = setTimeout(function() {
        return _this.countdown();
      }, settings.countDown);
    };

    game.prototype.bingo = function() {
      this.point++;
      return this.getQuiz();
    };

    game.prototype.end = function() {
      this.toggleBodyClass('end');
      this.getComment();
      this.showPoint();
      clearTimeout(this.timer);
      this.reset();
      return this.gameroverTimer = setTimeout(function() {
        return $gameover.removeClass('showGameOver');
      }, 1000);
    };

    game.prototype.getQuiz = function() {
      var i, numbers, quizStr, _i;

      $showContent.removeClass('in');
      numbers = this.point === 0 ? 0 : this.point === 1 ? 1 : this.point < 5 ? this.random(3) + 2 : this.point < 10 ? this.random(6) + 2 : this.random(8) + 5;
      quizStr = '';
      for (i = _i = 0; _i <= numbers; i = _i += 1) {
        quizStr += '反';
      }
      this.is_anti = numbers % 2 === 0 ? true : false;
      $showContent.html("" + quizStr + "服貿").parent()._bigtext();
      return setTimeout(function() {
        return $showContent.addClass('in');
      }, 300);
    };

    game.prototype.getComment = function() {
      var comment, key, value, _ref;

      comment = "" + this.point + " 分點評：";
      _ref = settings.levels;
      for (key in _ref) {
        value = _ref[key];
        if (this.point < key) {
          comment += value[Math.floor(Math.random() * value.length)];
          break;
        }
      }
      return this.showComment(comment);
    };

    game.prototype.showPoint = function() {
      return $showPoint.text(this.point).parent()._bigtext();
    };

    game.prototype.showComment = function(comment) {
      return $comment.html(comment);
    };

    game.prototype.showTime = function(time) {
      return $timestamp.text(time);
    };

    game.prototype.random = function(max) {
      return Math.ceil(Math.random() * max);
    };

    game.prototype.toggleBodyClass = function(status) {
      switch (status) {
        case 'play':
          return $body.removeClass('status-intro status-end').addClass('status-playing');
        case 'end':
          return $body.removeClass('status-playing').addClass('status-end');
      }
    };

    return game;

  })();

  new game();

  console && console.clear();

}).call(this);
