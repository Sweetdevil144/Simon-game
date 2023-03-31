let gamePattern = []; let userClickedPattern = [];
const buttonColor = ['green', 'red', 'yellow', 'blue'];
let started = false;
let userChosenButton; let randomChosenColor; let randomNumber;
let level = 0;

//When a key is pressed, Initially this function is called.
$(document).keypress(function() {
  if (started === false) {
    $("#level-title").text("Level 0");
    started = true;
    nextSequence();
  }
});

$('#start-btn').click(function() {
  if (started === false) {
    $("#level-title").text("Level 0");
    started = true;
    nextSequence();
  }
});

//Getting info of the button pressed by user and executing the function.
$('.grid-element').click(function() {
  userChosenButton = $(this).attr('id');
  userClickedPattern.push(userChosenButton);

  checkAnswer(userClickedPattern.length - 1);
  animatePress(userChosenButton);
  playSound(userChosenButton);
});

//Checking the answer
function checkAnswer(currentLevel) {

  // I'm facing problem in this section of code.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
    startOver();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

  }
}

//Function defining.
function nextSequence() {
  level++;

  //Getting a random button input.
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);


  $('#level-title').text('Level ' + level);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // playSound(userChosenButton);
}


//Adding another class temporarily when correct button is pressed
function animatePress(userChosenColor) {
  $(`#${userChosenColor}`).addClass("pressed");
  setTimeout(function() {
    $(`#${userChosenColor}`).removeClass("pressed");
  }, 50);
}


//Playing the sound when the correct button is pressed.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.preload = 'auto';
  audio.play();
}

//Playing the sound when an incorrect button is pressed
function wrongAnswer() {
  $(`#${userChosenButton}`).fadeOut(100).fadeIn(100);
  $(`#${userChosenButton}`).addClass("game-over");
  setTimeout(function() {
    $(`#${userChosenButton}`).removeClass("game-over");
  }, 50);
  var audio = new Audio("sounds/wrong.mp3");
  audio.preload = 'auto';
  audio.play();
}


//Start Over Function.
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

