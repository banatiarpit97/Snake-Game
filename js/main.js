var a = $("#move").position();
var leftOffset = document.getElementById("boundary").offsetLeft;
var topOffset = document.getElementById("boundary").offsetTop;
var width = document.getElementById("boundary").offsetWidth;
var height = document.getElementById("boundary").offsetHeight;
var count=0;
var down = setInterval(moveDown, 100);
clearInterval(down);

var up = setInterval(moveUp, 100);
clearInterval(up);

var left = setInterval(moveLeft, 100);
clearInterval(left);

var right = setInterval(moveRight, 100);

$(document).keypress(function(e){
	if(String.fromCharCode(e.which) == "s"){
		clearInterval(right);
		clearInterval(left);
		clearInterval(up);
		down = setInterval(moveDown, 100);
	}
})


function moveRight() {
	$("#move").css("left", a.left);
	a.left +=25;
	// if(($("#move").position().left % 3) ==  0){
	// 	$("#move").prepend("<div class = 'internal'>1</div>");
	// }
	console.log($("#move").position().left)
	if($("#move").position().left >= width){
     clearInterval(right)
    }
}

function moveDown(){
	a.top += 20;
	$("#move").css("top", a.top);
	if($("#move").position().top >= height){
		console.log("hh")
        clearInterval(down)
    }
}

function moveLeft(){
	a.left -= 20;
	$("#move").css("left", a.left);
	if($("#move").position().left <= leftOffset){
     clearInterval(left)
    }
}

function moveUp(){
	a.top -= 20;
	$("#move").css("top", a.top);
	if($("#move").position().top <= topOffset){
     clearInterval(top)
    }
}



// function preDown()
// {
// 	count++;






// }
var ele = document.getElementById("move");
console.log(ele.childElementCount)

// $(document).keypress(function(e){
// 	if(String.fromCharCode(e.which) == "w"){
// 		clearInterval(right);
// 		clearInterval(left);
// 		clearInterval(down);
// 		var up = setInterval(moveUp, 300);

// 	}

// })

// $(document).keypress(function(e){
// 	if(String.fromCharCode(e.which) == "a"){
// 		clearInterval(right);
// 			clearInterval(up);
// 		clearInterval(down);

// 		var left = setInterval(moveLeft, 300);

// 	}

// })

// $(document).keypress(function(e){
// 	if(String.fromCharCode(e.which) == "d"){
// 		clearInterval(up);
// 		clearInterval(left);
// 		clearInterval(down);
// 		var right = setInterval(moveRight, 300);

// 	}

// })