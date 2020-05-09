let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;


function playerTakeTurn(e) {

	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();
	} else {
		showLightBox("This box is already selected.", "Please try another box.");
		return;
	}//else

	if (gameStatus != "") {
		showLightBox(gameStatus, "Game Over.")
	}


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

}//checkGameStatus


function checkWin() {
	let cb = [];
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


}

