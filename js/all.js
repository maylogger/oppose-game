$('.bigtext').each(function(){
  $(this).bigtext({maxfontsize: 120});
});

$('#start').on("click", function(){
  $('.status-intro').removeClass('status-intro').addClass('status-playing');
  return false;
});

var initTime = 30;
var checkNumb;
var point = 0;
var clicked = 0;
$('.timestamp').html(initTime);

var CrazyrandomText = function(){
  var main = setTimeout(function(){
    if (initTime > 0){
      clicked = 0;
      var numbers = Math.ceil(Math.random()*(20-0));
      var str = '';
      for (var i = numbers ; i >= 0; i--) {
        str += '反';
      };
      if( numbers%2==0 ){
        checkNumb = 0
        $('.final').html('反');
      }else{
        checkNumb = 1
        $('.final').html('挺');
      }
      $('.showContent').html(str+'服貿')
      randomText()
    }else{
      checkNumb = undefined;
      clearTimeout(main);
    }
  },500)
};

var randomText = function(){
  if (initTime > 0){
    clicked = 0;
    var numbers = Math.ceil(Math.random()*(20-0));
    var str = '';
    for (var i = numbers ; i >= 0; i--) {
      str += '反';
    };
    if( numbers % 2 == 0 ){
      checkNumb = 0
      $('.final').html('反');
    }else{
      checkNumb = 1
      $('.final').html('挺');
    }
    $('.showContent').html(str+'服貿');
    $('.bigtext').bigtext({maxfontsize: 120});
  }
};

var startGame = function()  {
  var main = setTimeout(function(){
    if ( initTime > 0 ){
      initTime = initTime - 1;
      $('.timestamp').html(initTime);
      startGame();
    }else if (initTime == 0){
      clearTimeout(main);
      $('.showpoint').html(point);
      $('.bigtext').bigtext({maxfontsize: 120});
      $('body').removeClass('status-playing').addClass('status-end');
      point = 0;
      initTime = 30
      $('.timestamp').html(initTime);
    }
  },1000)
};

var game = {
  init : function(){
    randomText();
    startGame();
  },
  next : function(){
    randomText();
  }
};

$('.play').on('click',function(){
  if (initTime == 30){
    game.init();
    $('body').removeClass('status-intro status-end').addClass('status-playing')
  }else{
    initTime =0;
    game.init();
  }
});

$('.btn-yes').on('click',function(){
  if( checkNumb == 1 && clicked == 0 ) {
    point ++;
    clicked = 1;
    game.next();
  }else if (checkNumb == 0 && clicked == 0){
    initTime = 0
  }
})

$('.btn-no').on('click',function(){
  if( checkNumb == 0 && clicked == 0 ) {
    point ++;
    clicked = 1;
    game.next();
  }else if (checkNumb == 1 && clicked == 0){
    initTime = 0
  }

})
