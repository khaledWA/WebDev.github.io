const levels = [ 
	//level 0
	["horser", "animate", "animate", "animate", "albert",
  	 "rock", "rock", "", "fencef", "water",
 	 "flag", "", "", "", "",
  	 "", "", "tree", "", "",
  	 "", "", "fenceu", "", ""],

	 ["flag", "fenceu", "", "", "",
  	 "rock", "rock", "animate", "animate", "animate",
 	 "albert", "rock", "", "tree", "",
  	 "", "animate", "animate", "animate", "",
  	 "water", "", "", "rock", "horseu"],

 ]; // end of levels

 const gridBoxes = document.querySelectorAll("#gameBoard div");
 var currentLevel = 0; //starting level
 var riderOn = false;
 var currentLocationOfHorse = 0;
 var currentAnimation; //allow 1 animation per level



 window.addEventListener("load", function () {
 	loadLevel();

 });

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
 		boxes[index].classList.add("hrr");
 	} else if(direction == "left") {
 		boxes[index].classList.add("hrl");
 	} else if(direction == "up") {
 		boxes[index].classList.add("hru");
 	} else if(direction == "down") {
 		boxes[index].classList.add("hrd");
 	} else
 	//remove images from other boxes
 	for (i = 0; i < boxes.length; i++) {
 		if (i != index) {
 			boxes[i].classList.remove("hrr")
 			boxes[i].classList.remove("hrl")
 			boxes[i].classList.remove("hru")
 			boxes[i].classList.remove("hrd")
 		
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
 	} else

 	currentAnimation = setTimeout(function() {
 		animateEnemy(boxes, index, direction);
 	}, 750);

 

 }//animateEnemy