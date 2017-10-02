// var a = $("#move").position();
    angular.module('snake',['ngMaterial'])
    .controller('SnakeGame', function($scope, $mdDialog){
        var score = 0;
        var mode;
        var speed;
        var woah;
        var frequency;
        var leftOffset = document.getElementById("boundary").offsetLeft;
var topOffset = document.getElementById("boundary").offsetTop;
var width = document.getElementById("boundary").offsetWidth;
var height = document.getElementById("boundary").offsetHeight;
var count = document.getElementById("boundary").childElementCount;
var hit = document.getElementById("hit"); 
var eat = document.getElementById("eat"); 
var playedOnce;

console.log(topOffset);

var minX = leftOffset;
var maxX = leftOffset+width;
var minY = topOffset;
var maxY = topOffset+height;
var u=".internal:nth-child("
var r;
var direction;
var gameon=false;
        $(".pause").hide();
        $(".restart").hide();

         $scope.mode = function(ev) {
						 $mdDialog.show({
								 controller: DialogController,
								 templateUrl: 'gameModes.html',
								 parent: angular.element(document.body),
								 targetEvent: ev,
								 clickOutsideToClose:true// Only for -xs, -sm breakpoints.
						 });

		 };
// $(".playButton").click(function(){
// 	if(playedOnce){
// 		location.reload();
// 	}
// })		 



		function DialogController($scope, $mdDialog) {

            $scope.overflow = "die hitting walls";
            $scope.speed = "medium";

						 $scope.close = function() {
								 $mdDialog.cancel();
						 };
						 $scope.cancel = function() {
								 $mdDialog.cancel();
						 };
						 $scope.confirmMode = function() {
               mode = $scope.overflow;
               speed = $scope.speed;
                   if(speed == "slow"){
                       frequency = 200;
                    } 
                    else if(speed == "medium"){
                      frequency = 100;
                    }   
                    else if(speed == "fast"){
                      frequency = 50;
                    } 
                    console.log(speed, frequency)
                    // startPosition();
               woah = setInterval(right, frequency);
               gameon = true;
               direction ="right";
               $(".playButton").hide();
               $(".pause").show();
               $(".restart").show();
               $(".keyboard").css({"margin-top":"-47%", "margin-right":"-24%"});
               $(".scorediv").css({"margin-top":"-27%", "margin-right":"-31%"});




								 $mdDialog.cancel();
						 };
        };


   

var left=((count-1)*20);



function generateFruit(){
	randomFruitPosX = (Math.floor((Math.random() * ((maxX-20) - (minX+20))+(minX+20))/20)*20);
    randomFruitPosY = (Math.floor((Math.random() * ((maxY-20) - (minY+20))+(minY+20))/20)*20);
    $("#fruit").css("left", randomFruitPosX);
    $("#fruit").css("top", randomFruitPosY);
    $("#fruit").removeClass("hidden");
};
generateFruit();

function checkContact(prevLeft, prevTop,s, j){
 // subtracted because of margin and borders
	if((prevLeft == (randomFruitPosX-60)) && ((prevTop) == (randomFruitPosY-60))){
		eat.play();
		lastChild = ".internal:nth-child("+count+")";
		lastChildX = $(lastChild).position().left-s;
	    lastChildY = $(lastChild).position().top-j;
		$("#boundary").append("<div class = 'internal'></div>");
		count++;
		score++;
		$("#score").html(score)
		lastChild = ".internal:nth-child("+count+")";
		$(lastChild).css("left", lastChildX);
		$(lastChild).css("top", lastChildY );
		generateFruit();
    }
}

$("#boundary").click(function(e){
	clickX = (e.pageX-leftOffset-5);
	clickY = (e.pageY-topOffset-5);
	prevPosX = $(".internal:nth-child(1)").position().left;
	prevPosY = $(".internal:nth-child(1)").position().top;
	if((clickY>prevPosY) && (direction != "up")){
		clearInterval(woah);
		direction = "down";
		woah=setInterval(down,frequency);
	}
	else if((clickY<prevPosY) && (direction != "down")){
		clearInterval(woah);
		direction = "up";
		woah=setInterval(up,frequency);
	}
	else if((clickX>prevPosX) && (direction != "left")){
		clearInterval(woah);
		direction = "right";
		woah=setInterval(right,frequency);
	}
	else if((clickX<prevPosX) && (direction != "right")){
		clearInterval(woah);
		direction = "left";
		woah=setInterval(lef,frequency);
	}


})

$(".playButton").click(function(){
	if(playedOnce){
		location.reload();
	}
})

$(".restart").click(function(){
  location.reload();
})
$(".pause").click(function(){
  if(gameon){
    clearInterval(woah);
    gameon = false;
    $(this).html("Resume");
  }
  else{
    if(direction == "right"){
       woah=setInterval(right,frequency);
    }
    else if(direction == "left"){
       woah=setInterval(lef,frequency);
    }
    else if(direction == "up"){
       woah=setInterval(up,frequency);
    }
    else if(direction == "down"){
       woah=setInterval(down,frequency);
    }
    gameon = true;
    $(this).html("Pause");
  } 

});



// to reverse the order of internal div 
for(var i=1;i<=count;i++)
{
	r=u+i+")";
	$(r).css("left",left);
	left=left-20;
}
var prevPos;
var prevLeft;
var prevTop;
var temp;
var temp1;
var i;
function lef(){
	move(-20,0);
};
function up(){
	move(0,-20);
};
function down(){
	move(0,20);
};
function right(){
	move(20,0);
};


$(document).keypress(function(e){
	if((String.fromCharCode(e.which) == "s") && (gameon) && (direction!="up")){
		clearInterval(woah);
		direction = "down";
		woah=setInterval(down,frequency);
		$(".skey").css("background-color", "grey");
		setTimeout(function(){$(".skey").css("background-color", "#e0dcdc")}, 300)
	}
	else if((String.fromCharCode(e.which)=="d") && (gameon) && (direction!="left")){
		clearInterval(woah);
		direction = "right";
		woah=setInterval(right,frequency);
		$(".dkey").css("background-color", "grey");
		setTimeout(function(){$(".dkey").css("background-color", "#e0dcdc")}, 300)
	}
	else if((String.fromCharCode(e.which)=="a") && (gameon) && (direction!="right")){
		clearInterval(woah);
		direction = "left";
		woah=setInterval(lef,frequency);
		$(".akey").css("background-color", "grey");
		setTimeout(function(){$(".akey").css("background-color", "#e0dcdc")}, 300)
	}
	else if((String.fromCharCode(e.which)=="w") && (gameon) && (direction!="down")){
		clearInterval(woah);
		direction = "up";
		woah=setInterval(up,frequency);
		$(".wkey").css("background-color", "grey");
		setTimeout(function(){$(".wkey").css("background-color", "#e0dcdc")}, 300)
	}
});

	$(".skey").click(function(){
		if((gameon) && (direction!="up")){
			clearInterval(woah);
			direction = "down";
			woah=setInterval(down,frequency);
			$(".skey").css("background-color", "grey");
			setTimeout(function(){$(".skey").css("background-color", "#e0dcdc")}, 300)
	    }
	});

	$(".dkey").click(function(){
		if((gameon) && (direction!="left")){
			clearInterval(woah);
		direction = "right";
		woah=setInterval(right,frequency);
		$(".dkey").css("background-color", "grey");
		setTimeout(function(){$(".dkey").css("background-color", "#e0dcdc")}, 300)
	    }
	});

	$(".akey").click(function(){
		if((gameon) && (direction!="right")){
		clearInterval(woah);
		direction = "left";
		woah=setInterval(lef,frequency);
		$(".akey").css("background-color", "grey");
		setTimeout(function(){$(".akey").css("background-color", "#e0dcdc")}, 300)
	    }
	});
	
		$(".wkey").click(function(){
		if((gameon) && (direction!="down")){
			clearInterval(woah);
		direction = "up";
		woah=setInterval(up,frequency);
		$(".wkey").css("background-color", "grey");
		setTimeout(function(){$(".wkey").css("background-color", "#e0dcdc")}, 300)
	    }
	});	


function move(s,j)
{
prevPos=$(".internal:nth-child(1)").position();
prevLeft=prevPos.left+s;
prevTop=prevPos.top+j;
checkContact(prevLeft, prevTop,s, j);
z = hitItself(prevLeft, prevTop);
if(z==1){
	return;
}
if(mode == "die hitting walls"){
	y = hitWall(prevLeft, prevTop);
	if(y==1){
		return;
	}
}
else{	
	overflow = throughWall(prevLeft, prevTop);
	if(overflow == "rightOverflow"){
		prevLeft = 0;
	}
	if(overflow == "leftOverflow"){
		prevLeft = (width-30);
	}
	if(overflow == "downOverflow"){
		prevTop = 0;
	}
	if(overflow == "topOverflow"){
		prevTop = (height-30);
	}
}
for(i=1;i<=count;i++)
 {
	r=u+i+")";
	temp=$(r).position();
	$(r).css("left",prevLeft);
	$(r).css("top",prevTop);
	prevLeft=temp.left;
	prevTop=temp.top;
 }
};


function hitItself(prevLeft, prevTop){
	
	for(i=2;i<=count;i++){
		r=u+i+")";
		if(($(r).position().left == prevLeft) && ($(r).position().top==prevTop)){
            hit.play();
			clearInterval(woah);
			gameon = false;
			gameEnd();
			return "1";
		}
	}
}

function hitWall(prevLeft, prevTop){
	// -20 to stop at the boundary only, not go ahead
   if((prevLeft >= (width-20))||(prevLeft <= -15)||(prevTop >= (height-20))||(prevTop == -20)){
   	  clearInterval(woah);
	  gameon=false;
      hit.play();
      gameEnd();
	  return "1";
   }
}

function throughWall(prevLeft, prevTop){
   if((prevLeft+20) >= width){
   	  return "rightOverflow";
   }
    if((prevLeft-20) <= -35){
   	  return "leftOverflow";
   }
    if((prevTop+20) >= height){
   	  return "downOverflow";
   }
    if((prevTop-20) == -40){
   	  return "topOverflow";
   }
}
 })

function gameEnd(){
    $(".pause").hide();
    $(".restart").hide();
	$(".playButton").show();
	$(".keyboard").css({"margin-top":"-54%", "margin-right":"-45%"});
    $(".scorediv").css({"margin-top":"-31%", "margin-right":"-51%"});
    playedOnce = true;
}

// function startPosition(){
// var count = 6;
// var left=((count-1)*20);
// //to reverse the order of internal div 
// for(var i=1;i<=count;i++)
// {
//   r=u+i+")";
//   $(r).css("left",left);
//   left=left-20;
// }
// score = 0;
// $("#score").html(score);
// direction = right;

// }
