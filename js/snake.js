var screen_w = ($(window).width() >= $(window).height()) ? $(window).width() : $(window).height();
var screen_h = ($(window).width() <= $(window).height()) ? $(window).width() : $(window).height();
var celda_size = Math.floor((screen_h*0.98)/20);
var tablero_size = celda_size*20;

$('#gameover').width(tablero_size);
$('#gameover').height(tablero_size);
$('#div_main').width(tablero_size);
$('#div_main').height(tablero_size);
 
 
 var score = null;
 var maxscore = 0;
 var speed = null;
 var dir=1;
 var snake=["3_10","2_10","1_10"];
 var food=""; 
 
 $('#newgame').click(function() {
	 $('#newgame').css('visibility','hidden');
	 myinit();
 });
 
 function myinit(){
	speed = 200;
	$('#gameover').css('visibility','hidden');
	maxscore = (score > maxscore) ? score : maxscore;
	$('#maxscore').html(maxscore);
	score = 0;
	$('#score').html('0');
	dir=1;
	snake=["3_10","2_10","1_10"];
	food="";
	$('#div_main').html("");
	for (var r=0;r<20;r++){
	  for (var c=0;c<20;c++){
		$('#div_main').append('<div class=mycell id=c_'+r+'_'+c+'></div>');
	  }
	}
	
	$('.mycell').width(celda_size);
	$('.mycell').height(celda_size);
	
	$('#c_1_10').addClass('sel');
	$('#c_2_10').addClass('sel');
	$('#c_3_10').addClass('sel');
	generatefood();
	setTimeout(function(){gameupdate()}, speed);
 }
 myinit();
 function generatefood(){
    var r1 = Math.floor(Math.random() * 19);
    var c1 = Math.floor(Math.random() * 19);
    $('#c_'+r1+'_'+c1).addClass('selA');
    food=''+r1+'_'+c1;
 } 
 function gameupdate(){
  var tail=snake.pop(); 
  $('#c_'+tail).removeClass('sel');
  var hh=snake[0];
  var rc=hh.split("_");
  var r=parseInt(rc[0]);
  var c=parseInt(rc[1]);
  switch(dir){
    case 1: r=r+1; break; // Bottom
    case 2: c=c-1; break; // Left
    case 3: r=r-1; break; // Top
    case 4: c=c+1; break;  // Right
  }  
  var nn=""+r+"_"+c;
  if (nn==food){
      snake.push(tail);
      $('#c_'+tail).addClass('sel');
      $('#c_'+food).removeClass('selA');
	  speed = speed - 5;
	  score++;
	  $('#score').html(score);
      generatefood();
  }
  snake.unshift(nn);
  $('#c_'+nn).hasClass('sel'); 
  //condition to exist the Game !
  if (c<0 || r<0 || c>19 || r>19 ||  $('#c_'+nn).hasClass('sel') ){
    $('#gameover').css('visibility','visible'); 
	$('#newgame').css('visibility','visible'); 
    return false;
  }  
  $('#c_'+nn).addClass('sel');       
  setTimeout(function(){gameupdate()}, speed);
 } 
 $(document).keydown(function(e){
    if (e.keyCode == 37 || e.keyCode == 79) { 		// Izda
       dir=2;
    }else if (e.keyCode == 38 || e.keyCode == 81) { // Arriba
       dir=3;
    }else if (e.keyCode == 39 || e.keyCode == 80) { // Dcha
       dir=4;
    }else if (e.keyCode == 40 || e.keyCode == 65) { // Abajo
       dir=1;
    }
});
	$('#btn_up').click ( function() { dir=3; });
	$('#btn_down').click ( function() { dir=1; });
	$('#btn_left').click ( function() { dir=2; });
	$('#btn_right').click ( function() { dir=4; });
	