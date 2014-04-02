$('.intro .bigtext').bigtext({maxfontsize: 120, minfontsize:14 });
$('.end .bigtext').bigtext({maxfontsize: 36, minfontsize:14 });
$('.gameover .bigtext').bigtext({maxfontsize: 120});

$('#start').on("click", function(){
  $('.status-intro').removeClass('status-intro').addClass('status-playing');
  return false;
});

var initTime = 30;
var checkNumb;
var point = 0;
var clicked = 0;
var comment = "點評：";
$('.timestamp').html(initTime);

var randomText = function(){
  $('.in').removeClass('in').addClass('out');
  if (initTime > 0){
    clicked = 0;
    // var numbers = Math.ceil(Math.random()*(20-0));
    var numbers = ( point < 9 ) ? Math.ceil(Math.random()*(4-0)) : Math.ceil(Math.random()*(13-0));
    var str = '';
    for (var i = numbers ; i >= 0; i--) {
      str += '反';
    };
    if ( numbers % 2 == 0 ){
      checkNumb = 0
      // $('.final').html('反');
    } else {
      checkNumb = 1
      // $('.final').html('挺');
    }
    $('.showContent').html(str+'服貿').parent().bigtext({maxfontsize: 100});
    setTimeout(function(){
      $('.out').removeClass('out').addClass('in');
    },300);
  }
};

var main = null

var startGame = function()  {
  main = setTimeout(function(){
    if ( initTime == 0 ){
      clearTimeout(main);
      game.end();
    }else if ( initTime > 0 ){
      initTime = initTime - 1;
      $('.timestamp').html(initTime);
      startGame();
    }
  },1000)
};

var endGame = function()  {
  $('.showpoint').html(point).parent().bigtext({maxfontsize: 200});
  if ( point < 1 ) {
    comment += "智商跟馬英九相同。"
  } else if ( point < 6 ) {
    comment += "你的偷懶害立法院失守了"
  } else if ( point < 7 ) {
    comment += "你的偷懶害立法院失守了"
  } else if ( point < 8 ) {
    comment += "白衫軍攻勢太強！<br>再玩一次！"
  } else if ( point < 9 ) {
    comment += "請注意務必逐題審查！"
  } else if ( point < 10 ) {
    comment += "快出門！<br>立法院需要你的支援！"
  } else if ( point < 11 ) {
    comment += "Over My Dead Body"
  } else if ( point < 12 ) {
    comment += "涂明義救援中！"
  } else if ( point < 13 ) {
    comment += "公聽會有辦等於沒辦！"
  } else if ( point < 14 ) {
    comment += "臉書被檢舉照片太醜<br>王炳忠：言語霸凌!"
  } else if ( point < 15 ) {
    comment += "「你們不配當中國人」<br>語畢，哄堂大笑"
  } else if ( point < 16 ) {
    comment += "馬總統民調只有九趴，<br>你們是不是也是多數在霸凌少數"
  } else if ( point < 17 ) {
    comment += "先立法後答題"
  } else if ( point < 18 ) {
    comment += "辨識度堪稱糾察隊"
  } else if ( point < 19 ) {
    comment += "辨識度堪稱糾察隊"
  } else if ( point < 20 ) {
    comment += "林飛帆表示：陳為廷在我旁邊啦！"
  } else if ( point < 21 ) {
    comment += "林飛帆表示：陳為廷在我旁邊啦！"
  } else if ( point < 25 ) {
    comment += "你的分辨率太高，TVBS、中天都做不了假新聞..."
  } else if ( point < 32 ) {
    comment += "你證明了 Z < B"
  } else {
    comment += "你證明了 Z < B"
  }
  $('.comment').html(comment);
  $('body').removeClass('status-playing').addClass('status-end');
  point = 0;
  comment = "點評：";
  initTime = 30;
  clearTimeout(main);
  $('.timestamp').html(initTime);
  setTimeout(function(){
    $('.gameover').removeClass('showGameOver')
  }, 1000);

};

var game = {
  init : function(){
    randomText();
    startGame();
  },
  next : function(){
    randomText();
  },
  end : function(){
    endGame();
  }
};

$yes  = $('.btn-yes')
$no   = $('.btn-no')
$play = $('.play')


$(document).on('keydown', function( e ){
  var key = e.which;
  if( $('body').hasClass('status-end') ) return;
  switch( key ) {
    case 37: //left
      $no.trigger('click');
      break;
    case 39: // right
      $yes.trigger('click');
      break;
  }
})

$play.on('click',function(){
  game.init();
  $('body').removeClass('status-intro status-end').addClass('status-playing')
  $('.gameover').addClass('showGameOver')
});

$yes.on('click',function(){
  if( checkNumb == 1 && clicked == 0 ) {
    point ++;
    clicked = 1;
    game.next();
  }else if (checkNumb == 0 && clicked == 0){
    game.end();
  }
})

$no.on('click',function(){
  if( checkNumb == 0 && clicked == 0 ) {
    point ++;
    clicked = 1;
    game.next();
  }else if (checkNumb == 1 && clicked == 0){
    game.end();
  }
})
