var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
const blockHeight = document.getElementById("block").offsetHeight;
const blockWidth = document.getElementById("block").offsetWidth;
var positionOfBlock = document.getElementById("block").offsetTop;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const stratTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = stratTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
 
var score1 = 0;
var score2 = 0;

var bounce = new sound("paddleHit.wav");
var pointGain = new sound("pointGain.wav");

var controlPlay;

/* window.addEventListener('load', function() {
	startBall();
}); */

 document.addEventListener('keydown', function(e) {
 	//console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) {
			 speedOfPaddle1 = -10;
	}

	if (e.keyCode == 83 || e.which == 83) {
			 speedOfPaddle1 = 10;
	}	

	if (e.keyCode == 38 || e.which == 38) {
			 speedOfPaddle2 = -10;
	}

	if (e.keyCode == 40 || e.which == 40) {
			 speedOfPaddle2 = 10;
	}	

	if (e.keyCode == 77 || e.which == 77) {
		speedOfPaddle1 = 0;
	}


 });

 document.addEventListener('keyup', function(e) {
 	//console.log("key up " + e.keyCode);
 	if (e.keyCode == 87 || e.which == 87) {
			 speedOfPaddle1 = 0;
	}

	if (e.keyCode == 83 || e.which == 83) {
			 speedOfPaddle1 = 0;
	}
	
	if (e.keyCode == 38 || e.which == 38) {
			 speedOfPaddle2 = 0;
	}

	if (e.keyCode == 40 || e.which == 40) {
			 speedOfPaddle2 = 0;
	}

	if (e.keyCode == 77 || e.which == 77) {
		speedOfPaddle1 = 10;
	}

 });

//object plays sound
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
 


function startBall() {
  let direction = 1;
  topPositionOfBall = stratTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;

  if (Math.random() < 0.5) {
  	direction = 1;
  } else {
  	direction = -1;
  }
  topSpeedOfBall = Math.random() * 2 + 3;
  leftSpeedOfBall = direction * (Math.random() * 2 + 3);

} //startBall



function show() {

	if (score1 == 15 || score2 == 15) {
			stopGame();
		}

	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;

	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}

	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}

	if (positionOfPaddle1 >= gameBoardHeight - paddleHeight) {
		positionOfPaddle1 = gameBoardHeight - paddleHeight;
	}

	if (positionOfPaddle2 >= gameBoardHeight - paddleHeight) {
		positionOfPaddle2 = gameBoardHeight - paddleHeight;
	}


	if (topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight) {
		topSpeedOfBall *= -1;

	}

	if (leftPositionOfBall <= paddleWidth) {

		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
		} else {
			pointGain.play();
			startBall();
			score2++;
		}//else
	}//if

	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		if (topPositionOfBall > positionOfPaddle2 && 
			topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
		} else {
			pointGain.play();
			startBall();
			score1++;
			
		}//else

		

	}//if

document.getElementById("score2").innerHTML = score2;
document.getElementById("score1").innerHTML = score1;
document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
document.getElementById("ball").style.top = topPositionOfBall + "px";
document.getElementById("ball").style.left = leftPositionOfBall + "px";

}//show

function resumeGame() {
if (!controlPlay) {
	controlPlay = window.setInterval(show, 1000/60);
}
}//resumeGame

function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

function startGame() {
	score1 = 0
	score2 = 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall();

	if (!controlPlay) {
	controlPlay = window.setInterval(show, 1000/80);
}

}//startGame

function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;

	let message1 = "Tie Game";
	let message2 = "Close to continue.";

	if (score2 > score1) {
		message1 = "Player 2 wins with " + score2 + " point(s)!";
		message2 = "Player 1 had " + score1 + " point(s)!";
	} else if(score1 > score2){
		message1 = "Player 1 wins with " + score1 + " point(s)!";
		message2 = "Player 2 had " + score2 + " point(s)!";
	}//else

	showLightBox(message1, message2);

}//stopGame

/*** LightBox Code Start ***/

function changeVisibility(divID){
	var element = document.getElementById(divID)

	// if element exists, toggle it's class
	// between hidden and unhidden
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	} //if
} //changeVisibility

function showLightBox(message, message2) {

	document.getElementById("message").innerHTML = message;

	document.getElementById("message2").innerHTML = message2;

changeVisibility("lightbox");
changeVisibility("boundaryMessage");

}

function continueGame() {
changeVisibility("lightbox");
changeVisibility("boundaryMessage");

}//continueGame

/*** LightBox Code End ***/



