// var a = $("#move").position();
    angular.module('snake',['ngMaterial'])
    .controller('SnakeGame', function($scope){
        $scope.mode = "die hitting walls";
        var score = 0;
   
var leftOffset = document.getElementById("boundary").offsetLeft;
var topOffset = document.getElementById("boundary").offsetTop;
var width = document.getElementById("boundary").offsetWidth;
var height = document.getElementById("boundary").offsetHeight;
var ele = document.getElementById("boundary");

var minX = leftOffset;
var maxX = leftOffset+width;
console.log(maxX, width)
// var minY = topOffset;
var minY = 60;
var maxY = topOffset+height;
console.log(minX, maxX, minY, maxY);
var u=".internal:nth-child("
var r;
var direction;
var gameon=true;
var count=ele.childElementCount;
console.log(count);
var left=100;


function generateFruit(){
	randomFruitPosX = (Math.floor((Math.random() * ((maxX-20) - (minX+20))+(minX+20))/20)*20);
    randomFruitPosY = (Math.floor((Math.random() * ((maxY-20) - (minY))+(minY))/20)*20)+5;
    console.log(randomFruitPosX, randomFruitPosY);
    $("#fruit").css("left", randomFruitPosX);
    $("#fruit").css("top", randomFruitPosY);
    $("#fruit").removeClass("hidden");
};
generateFruit();

function checkContact(prevLeft, prevTop,s, j){
 // subtracted because of margin and borders
	if((prevLeft == (randomFruitPosX-60)) && ((prevTop) == (randomFruitPosY-5))){
		lastChild = ".internal:nth-child("+count+")";
		lastChildX = $(lastChild).position().left-s;
	    lastChildY = $(lastChild).position().top-j;
		$("#boundary").append("<div class = 'internal'></div>");
		count++;
		score++;
		$("#score").html(score)
		console.log(score)
		lastChild = ".internal:nth-child("+count+")";
		$(lastChild).css("left", lastChildX);
		$(lastChild).css("top", lastChildY );
		generateFruit();
    }
}


 
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

var woah = setInterval(right, 100);

$(document).keypress(function(e){
	if((String.fromCharCode(e.which) == "s") && (gameon) && (direction!="up")){
		clearInterval(woah);
		direction = "down";

		woah=setInterval(down,100);
	}
	else if((String.fromCharCode(e.which)=="d") && (gameon) && (direction!="left")){
		clearInterval(woah);
		direction = "right";

		woah=setInterval(right,100);
	}
	else if((String.fromCharCode(e.which)=="a") && (gameon) && (direction!="right")){
		clearInterval(woah);
		direction = "left";

		woah=setInterval(lef,100);
	}
	else if((String.fromCharCode(e.which)=="w") && (gameon) && (direction!="down")){
		clearInterval(woah);
		direction = "up";
		woah=setInterval(up,100);
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
if($scope.mode == "die hitting walls"){
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
			clearInterval(woah);
			gameon = false;
			return "1";
		}
	}
}

function hitWall(prevLeft, prevTop){
   if((prevLeft >= width)||(prevLeft <= -35)||(prevTop >= height)||(prevTop == -40)){
   	  clearInterval(woah);
	  gameon=false;
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
