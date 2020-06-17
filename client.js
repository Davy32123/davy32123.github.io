var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var leftSpeedOfBall = 0;
var topSpeedOfBall = 0;

var bounce = new sound("ballbounce.mp3");
var buzz = new sound("buzzer.mp3");

var controlPlay;
var score1 = 0;
var score2 = 0;

/*window.addEventListener('load', function() {
	startBall();
});*/

// move paddles
document.addEventListener('keydown', function(e) {
		//console.log("keydown" + e.keyCode);
		if (e.keyCode == 87 || e.which == 87) {
			speedOfPaddle1 = -10;
		} else if (e.keyCode == 83 || e.which == 83) {
			speedOfPaddle1 = 10;
		} else if (e.keyCode == 38 || e.which == 38) {
			speedOfPaddle2 = -10;
		} else if (e.keyCode == 40 || e.which == 40) {
			speedOfPaddle2 = 10;
		}// else if
});

//stop paddles
document.addEventListener('keyup', function(e) {
		//console.log("keyup" + e.keyCode);
		if (e.keyCode == 87 || e.which == 87) {
			speedOfPaddle1 = 0;
		} else if (e.keyCode == 83 || e.which == 83) {
			speedOfPaddle1 = 0;
		} else if (e.keyCode == 38 || e.which == 38) {
			speedOfPaddle2 = 0;
		} else if (e.keyCode == 40 || e.which == 40) {
			speedOfPaddle2 = 0;
		} // else if
});

//starts moving ball
function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	// 50 percent chance of starting on either left or right
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	} //else
	
	topSpeedOfBall = Math.random() * 2 + 3;
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);
}//startBall

//update locations of paddles and ball
function show() {
	
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddles from leaving gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}//if
	
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}//if
	
	if (positionOfPaddle1 >= gameBoardHeight - paddleHeight) {
		positionOfPaddle1 = gameBoardHeight - paddleHeight;
	}//if
	
	if (positionOfPaddle2 >= gameBoardHeight - paddleHeight) {
		positionOfPaddle2 = gameBoardHeight - paddleHeight;
	}//if
	
	//make ball bounce of edges of gameboard
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight) {	
		topSpeedOfBall *= -1;
	}//if
	
	//ball on left side of gameboard
	if (leftPositionOfBall <= paddleWidth) {
		
		//if ball hits paddle or misses
		if (topPositionOfBall > positionOfPaddle1&& topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			leftSpeedOfBall *= -1;
			bounce.play();
			if (leftSpeedOfBall < 22) {
				leftSpeedOfBall *= 1.2;
			}//if
		} else {
			buzz.play();
			startBall();
			score2++;
			document.getElementById("score2").innerHTML = score2;
			if(score1 == 15|| score2 == 15) {
				stopGame();
			}//if
		}//else
	}//if
	
	//ball on right side of gameboard
	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		
		//if ball hits paddle or misses
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			leftSpeedOfBall *= -1;
			bounce.play();
			if (leftSpeedOfBall < 22) {
				leftSpeedOfBall *= 1.2;
			}
		} else {
			buzz.play();
			startBall();
			score1++;
			document.getElementById("score1").innerHTML = score1;
			if(score1 == 15|| score2 == 15) {
				stopGame();
			}//if
		}//else
	}//if
	
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}//show

//starts game
function startGame() {
	document.getElementById("lightBox").style.display = "none";
	document.getElementById("endScreen").style.display = "none";
	score1 = 0;
	score2 = 0;
	document.getElementById("score2").innerHTML = score2;
	document.getElementById("score1").innerHTML = score1;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	
	startBall();
	resumeGame();
}//startGame

//resumes game
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//resumeGame

//pauses game
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//ends current game
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	if(score1 > score2) {
		document.getElementById("endMessage").innerHTML = "Player 1 wins with " + score1 + " points!"
		document.getElementById("endMessage2").innerHTML = "Player 2 had " + score2 + " points"
	} else if (score2 > score1) {
		document.getElementById("endMessage").innerHTML = "Player 2 wins with " + score2 + " points!"
		document.getElementById("endMessage2").innerHTML = "Player 1 had " + score1 + " points"
	} else {
		document.getElementById("endMessage").innerHTML = "It's A Tie!"
	}//else
	
	document.getElementById("lightBox").style.display = "block";
	document.getElementById("endScreen").style.display = "block";
}//stopGame

//sounds
//https://www.w3schools.com/graphics/game_sound.asp
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
}//sound
