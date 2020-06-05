const levels = [ 
	//level 0
	["horser", "", "animate", "", "rider",
  	 "rock", "rock", "animate", "fenceside", "water",
 	 "flag", "", "animate", "", "",
  	 "", "", "tree", "", "",
  	 "", "", "fenceup", "", ""],

	 ["flag", "fenceup", "", "", "",
  	 "rock", "rock", "animate", "animate", "animate",
 	 "rider", "rock", "", "tree", "",
  	 "", "animate", "animate", "animate", "",
  	 "water", "", "", "rock", "horse"],

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

	//if there is a fence, move two spaces with animation


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
	newClass = (riderOn) ? "horseride" : "horse";
	newClass += direction;

	//if there is a bridge in the next location, keep it
	if (gridBoxes[nextLocation].includes("bridge")) {
		newClass += " bridge";
	}

	//move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	//if it is an enemy 
	if(nextClass.includes("enemy")) {
		console.log("Game Lost");
		return;
	}

	//move up to next level if needed

}//tryToMove


//load levels 0 - max level
 function loadLevel() {
 	let levelMap = levels[currentLevel];
 	let animateBoxes;
 	riderOn = false;

 	//load board
 	for (i = 0; i < gridBoxes.length; i++) {
 		gridBoxes[i].className = levelMap[i];
 		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
 	}//for

 	animateBoxes = document.querySelectorAll(".animate");

 	animateEnemy(animateBoxes, 1, "down");

 }//loadLevel

 //animate enemy left to right (could add up and down to this)
 //boxes - array of grid boxes that include animation
 //index - current location of animation
 //direction - current direction of animation
 function animateEnemy(boxes, index, direction) {

 	if(boxes.length <= 0) { return; }

 	// update images
 	if(direction == "right") {
 		boxes[index].classList.add("enemyr");
 	} else if(direction == "left") {
 		boxes[index].classList.add("enemyl");
 	} else if(direction == "up") {
 		boxes[index].classList.add("enemy");
 	} else if(direction == "down") {
 		boxes[index].classList.add("enemyd");
 	}
 	//remove images from other boxes
 	for (i = 0; i < boxes.length; i++) {
 		if (i != index) {
 			boxes[i].classList.remove("enemyd")
 			boxes[i].classList.remove("enemyl")
 			boxes[i].classList.remove("enemyr")
 			boxes[i].classList.remove("enemy")
 		
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