const levels = [ 
	//level 0
	["horseright", "", "animate2", "", "rider",
  	 "rock", "rock", "animate2", "tree", "fenceside",
 	 "flag", "tree", "animate2", "", "",
  	 "", "", "tree", "", "",
  	 "", "", "fenceup", "", ""],

	 ["flag", "fenceup", "animate2", "", "",
  	 "rock", "rock", "animate2", "tree", "",
 	 "rider", "rock", "animate2", "tree", "",
  	 "", "animate", "animate", "animate", "",
  	 "water", "", "", "rock", "horseup"],

  	 ["flag", "fenceup", "", "", "",
  	 "rock", "water", "water", "bridge", "water",
 	 "rider", "", "", "", "",
  	 "tree", "rock", "rock", "animate", "animate",
  	 "horseright", "", "", "", ""],

  	 ["", "", "", "", "horseleft",
  	 "animate", "animate", "tree", "tree", "tree",
 	 "", "", "", "", "rider",
  	 "tree", "tree", "animate2", "animate3", "animate3",
  	 "girl", "fenceup", "animate2", "", ""],

 ]; // end of levels

 const gridBoxes = document.querySelectorAll("#gameBoard div");
 const noPassObstacles = ["rock", "tree", "water"];
 var currentLevel = 0; //starting level
 var riderOn = false;
 var currentLocationOfHorse = 0;
 var currentAnimation; //allow 1 animation per level
 var widthOfBoard = 5;


 window.addEventListener("load", function () {
 	loadLevel();

 });

 //move horse
 document.addEventListener("keydown", function(e) {

 	switch(e.keyCode) {
 		case 37: //left arrow
 			if(currentLocationOfHorse % widthOfBoard !== 0) {
 				tryToMove("left");
 			}
 			break;
 		case 38: //up arrow
 			if(currentLocationOfHorse - widthOfBoard >= 0) {
 				tryToMove("up");
 			}
 			break;
 		case 39: //right arrow
 			if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
 				tryToMove("right");
 			}
 			break;
 		case 40: //down arrow
 			if(currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
 				tryToMove("down");
 			}break;
 	}//switch
 }); //keyEvent listener




//try to move horse
function tryToMove(direction) {

	//location before move
	let oldLocation = currentLocationOfHorse;

	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; //location we wish to move
	let nextClass = ""; //class of location we wish to move to

	let nextLocation2 = 0;
	let nextClass2 = "";

	let newClass = ""; //new class to switch to if move succesful


	switch (direction) {
		case "left":
			nextLocation = currentLocationOfHorse - 1;
			break;
		case "right":
			nextLocation = currentLocationOfHorse +1/ 1;
			break;
		case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;
			break;
	}//switch

	nextClass = gridBoxes[nextLocation].className;

	//if the obstacle is not passable, dont move
	if(noPassObstacles.includes(nextClass)) { return; }

	//if it's a fence, and there is no rider, dont move
	if (!riderOn && nextClass.includes("fence")) { return; }

	//if there is a fence, move two spaces with animations
	if (nextClass.includes("fence")) {
		//rider must be on to jump
		if (riderOn) {
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;

			//set values according to direction
			if(direction == "left") {
				nextClass = "fenjumpleft";
				nextClass2 = "horseriderleft";
				nextLocation2 = nextLocation - 1;
			} else if(direction == "right") {
				nextClass = "fenjumpright";
				nextClass2 = "horseriderright";
				nextLocation2 = nextLocation + 1;
			} else if(direction == "up") {
				nextClass = "fenjumpup";
				nextClass2 = "horseriderup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if(direction == "down") {
				nextClass = "fenjumpdown";
				nextClass2 = "horseriderdown";
				nextLocation2 = nextLocation + widthOfBoard;
			} 
			//show horse jumping
			gridBoxes[nextLocation].className = nextClass;

			setTimeout(function () {

				//set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;

				// update current location of horse
				currentLocationOfHorse = nextLocation2;

				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;

				//show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;

				//if next box is a flag, go up a level
				levelUp(nextClass);

			}, 350);
			return;


		}//if riderOn

	}// if class fnece



	//if there is a rider, add rider
	if(nextClass == "rider") {
		riderOn = true;
	}

	//if there is a bridge in the old location keep it
	if(oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	}

	//build name of new class
	newClass = (riderOn) ? "horserider" : "horse";
	newClass += direction;

	//if there is a bridge in the next location, keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	}

	//move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	//if it is an enemy 
	if(nextClass.includes("enemy")) {
		document.getElementById("lose").style.display = "block";
		return;
	}

	//move up to next level if needed
	levelUp(nextClass);

	endGame(nextClass);

}//tryToMove


function levelUp(nextClass) {
	if(nextClass == "flag" || nextClass == "girl" && riderOn) {
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		clearTimeout(currentAnimation2);
		setTimeout (function() {
			document.getElementById("levelup").style.display = "none";
			if (currentLevel < 3) {
			currentLevel++;
			} else {
				document.getElementById("gameOver").style.display = "block";
				return;
			}
			loadLevel();
		}, 1000);
	}
}

function endGame(nextClass) {
if(nextClass == "girl" && riderOn) {
	document.getElementById("gameOver").style.display = "block";
		clearTimeout(currentAnimation);
		clearTimeout(currentAnimation2);
		setTimeout (function() {
			document.getElementById("gameOver").style.display = "none";
			if (currentLevel < 3) {
			currentLevel++;
			} else {
				document.getElementById("gameOver").style.display = "block";
				return;
			}
			loadLevel();
		}, 1000);
	}

}


//load levels 0 - max level
 function loadLevel() {
 	let levelMap = levels[currentLevel];
 	let animateBoxes;
 	let animateBoxes2;
 	riderOn = false;

 	//load board
 	for (i = 0; i < gridBoxes.length; i++) {
 		gridBoxes[i].className = levelMap[i];
 		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
 	}//for

 	animateBoxes = document.querySelectorAll(".animate");

 	animateEnemy(animateBoxes, 1, "right");

 	animateBoxes2 = document.querySelectorAll(".animate2");

 	animateEnemy2(animateBoxes2, 0, "down");

 	animateBoxes3 = document.querySelectorAll(".animate3");

 	animateEnemy2(animateBoxes3, 0, "right");

 }//loadLevel

 //animate enemy left to right (could add up and down to this)
 //boxes - array of grid boxes that include animation
 //index - current location of animation
 //direction - current direction of animation
 function animateEnemy(boxes, index, direction) {

 	if(boxes.length <= 0) { return; }

 	// update images
 	if(direction == "right") {
 		boxes[index].classList.add("enemyright");
 	} else if(direction == "left") {
 		boxes[index].classList.add("enemyleft");
 	} else if(direction == "up") {
 		boxes[index].classList.add("enemyup");
 	} else if(direction == "down") {
 		boxes[index].classList.add("enemydown");
 	}
 	//remove images from other boxes
 	for (i = 0; i < boxes.length; i++) {
 		if (i != index) {
 			boxes[i].classList.remove("enemydown")
 			boxes[i].classList.remove("enemyleft")
 			boxes[i].classList.remove("enemyright")
 			boxes[i].classList.remove("enemyup")
 		
 		}//if
 	}//for

 	//moving right
 	if (direction == "right") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "left";
 		} else {
 			index++;
 		}
 	} else if (direction == "left") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "right";
 		} else {
 			index--;
 		}
 	} else if (direction == "down") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "up";
 		} else {
 			index++;
 		}
 	} else if (direction == "up") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "down";
 		} else {
 			index--;
 		}
 	}

 	currentAnimation = setTimeout(function() {
 		animateEnemy(boxes, index, direction);
 	}, 750);


 }//animateEnemy

function animateEnemy2(boxes, index, direction) {

 	if(boxes.length <= 0) { return; }

 	// update images
 	if(direction == "right") {
 		boxes[index].classList.add("enemyright");
 	} else if(direction == "left") {
 		boxes[index].classList.add("enemyleft");
 	} else if(direction == "up") {
 		boxes[index].classList.add("enemyup");
 	} else if(direction == "down") {
 		boxes[index].classList.add("enemydown");
 	}
 	//remove images from other boxes
 	for (i = 0; i < boxes.length; i++) {
 		if (i != index) {
 			boxes[i].classList.remove("enemydown")
 			boxes[i].classList.remove("enemyleft")
 			boxes[i].classList.remove("enemyright")
 			boxes[i].classList.remove("enemyup")
 		
 		}//if
 	}//for

 	//moving right
 	if (direction == "right") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "left";
 		} else {
 			index++;
 		}
 	} else if (direction == "left") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "right";
 		} else {
 			index--;
 		}
 	} else if (direction == "down") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "up";
 		} else {
 			index++;
 		}
 	} else if (direction == "up") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "down";
 		} else {
 			index--;
 		}
 	}

 	currentAnimation2 = setTimeout(function() {
 		animateEnemy2(boxes, index, direction);
 	}, 750);


 }//animateEnemy

function animateEnemy3(boxes, index, direction) {

 	if(boxes.length <= 0) { return; }

 	// update images
 	if(direction == "right") {
 		boxes[index].classList.add("enemyright");
 	} else if(direction == "left") {
 		boxes[index].classList.add("enemyleft");
 	} else if(direction == "up") {
 		boxes[index].classList.add("enemyup");
 	} else if(direction == "down") {
 		boxes[index].classList.add("enemydown");
 	}
 	//remove images from other boxes
 	for (i = 0; i < boxes.length; i++) {
 		if (i != index) {
 			boxes[i].classList.remove("enemydown")
 			boxes[i].classList.remove("enemyleft")
 			boxes[i].classList.remove("enemyright")
 			boxes[i].classList.remove("enemyup")
 		
 		}//if
 	}//for

 	//moving right
 	if (direction == "right") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "left";
 		} else {
 			index++;
 		}
 	} else if (direction == "left") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "right";
 		} else {
 			index--;
 		}
 	} else if (direction == "down") {
 		//turn around if hit right side
 		if (index == boxes.length - 1) {
 			index--;
 			direction = "up";
 		} else {
 			index++;
 		}
 	} else if (direction == "up") {
 		//turn around if hit right side
 		if (index == 0) {
 			index++;
 			direction = "down";
 		} else {
 			index--;
 		}
 	}

 	currentAnimation3 = setTimeout(function() {
 		animateEnemy3(boxes, index, direction);
 	}, 750);


 }//animateEnemy


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

	var element = document.getElementById("lightbox");

	if(element.className == "unhidden") {

changeVisibility("lightbox");

changeVisibility("boundaryMessage");

animateBoxes = document.querySelectorAll(".animate");

 	animateEnemy(animateBoxes, 1, "right");

 	animateBoxes2 = document.querySelectorAll(".animate2");

 	animateEnemy2(animateBoxes2, 1, "down");

 	animateBoxes3 = document.querySelectorAll(".animate3");

 	animateEnemy2(animateBoxes3, 1, "right");

}else {
	return;
}

}//continueGame



/*** LightBox Code End ***/


function resumeGame() {

continueGame();

}//resumeGame



function pauseGame() {

	window.clearInterval(currentAnimation);
	window.clearInterval(currentAnimation2);

  let message1 = "Your game is paused";
  let message2 = " ";

  showLightBox(message1, message2);

  document.removeEventListener("keydown", function(e) {

 }); //keyEvent listener
	
}//pauseGame


function playAgain() {

	window.clearInterval(currentAnimation);
	window.clearInterval(currentAnimation2);
	changeVisibility("lose");
	currentLevel = 0;
	loadLevel();
	levelUp(nextClass);


}


