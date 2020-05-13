let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


function newGame() {
for (var i = 0; i < idNames.length; i++){
	document.getElementById(idNames[i]).innerHTML = "";
}//for

	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";

	changeVisibility("controls");

}//newGame



function playerTakeTurn(e) {

	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();

		if (gameStatus == "") {
			setTimeout(function() {
			computerTakeTurn();
			checkGameStatus();
				}, 500
			);
		}


	} else {
		showLightBox("This box is already selected.", "Please try another box.");
		return;
	}//else


}//playerTakeTurn

function checkGameStatus() {
	numTurns++;

	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
	}

	if (numTurns == 9) {
		gameStatus = "You Tied!";
	}//numTurns


	currentPlayer = (currentPlayer == "X" ? "O" : "X");

	if (gameStatus != "") {
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
	}

}//checkGameStatus


function checkWin() {
	let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;


//top row check for win
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	}//if1

	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	}//if2

	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}//if3

	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	}//if4

	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	}//if5

	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	}//if6

	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	}//if7

	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	}//if8

}//checkWin

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

	if (gameStatus != "") {
		changeVisibility("controls");
	}

}//continueGame


function computerTakeTurn(){
let idName = "";

let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;



if (cb[1] == "X" && cb[2] == "X" && cb[3] == "") {
  idName = idNames[2];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[4] == "X" && cb[5] == "X" && cb[6] == "") {
  idName = idNames[5];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[7] == "X" && cb[8] == "X" && cb[9] == "") {
  idName = idNames[8];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[1] == "X" && cb[4] == "X" && cb[7] == "") {
  idName = idNames[6];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[2] == "X" && cb[5] == "X" && cb[8] == "") {
  idName = idNames[7];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[3] == "X" && cb[6] == "X" && cb[9] == "") {
  idName = idNames[8];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[1] == "X" && cb[5] == "X" && cb[9] == "") {
  idName = idNames[8];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[3] == "X" && cb[5] == "X" && cb[7] == "") {
  idName = idNames[6];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[1] == "X" && cb[3] == "X" && cb[2] == "") {
  idName = idNames[1];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[7] == "X" && cb[9] == "X" && cb[8] == "") {
  idName = idNames[7];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[4] == "X" && cb[6] == "X" && cb[5] == "") {
  idName = idNames[4];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[1] == "X" && cb[7] == "X" && cb[4] == "") {
  idName = idNames[3];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[2] == "X" && cb[8] == "X" && cb[5] == "") {
  idName = idNames[4];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[3] == "X" && cb[9] == "X" && cb[6] == "") {
  idName = idNames[5];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[9] == "X" && cb[6] == "X" && cb[3] == "") {
  idName = idNames[2];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[8] == "X" && cb[5] == "X" && cb[2] == "") {
  idName = idNames[1];
   document.getElementById(idName).innerHTML = currentPlayer;
} else if (cb[7] == "X" && cb[4] == "X" && cb[1] == "") {
  idName = idNames[0];
   document.getElementById(idName).innerHTML = currentPlayer;
} else

{
do {
let rand = parseInt(Math.random()*9) + 1;
idName = idNames[rand-1];

if (document.getElementById(idName).innerHTML == "") {
	document.getElementById(idName).innerHTML = currentPlayer;
	break;
}

}while(true);

}

}





