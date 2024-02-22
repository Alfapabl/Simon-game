$(document).ready(function(){
buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
let level = 0;
var arraysMatch = true;
clickCount = 0;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];

    //add random choosen color to gamePattern Array
    gamePattern.push(randomChosenColour);

    //make the random selected color blink
    $("#"+ randomChosenColour).stop(true, true).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //update title when game start
    level += 1;
    $("#level-title").text("Level " + level);
    console.log("trigger")

}


// fucntion to play the music color when clicked
function playSound(sound){
    let audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play()
};

//function to animate the buttons
$('div[type="button"]').click(function() {
    var $this = $(this); 
    $this.addClass("pressed");  
    setTimeout(function() {
        $this.removeClass("pressed");
    }, 300); 
});


//function to compare the user input

function compareInputs() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        console.log(userClickedPattern);
        console.log(gamePattern);
        if (userClickedPattern[i] !== gamePattern[i]) {
            arraysMatch = false;
            break;
        }
    }

}


//Detect keyboard to start the game
function startGame() {
    if (level == 0) {
        nextSequence();
    }
}

//game over functionality

function gameOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    arraysMatch = true;
    clickCount = 0;
    $("#level-title").text("Game Over, Press Any Key To Restart");
    $("body").css("background-color", "red");
    playSound("wrong");
    setTimeout(function() {
        $("body").css("background-color", "#011F3F");
    }, 100); 
}

//in game sequence 

$(document).keypress(startGame);

//function to detect and store clicked button
$('div[type="button"]').click(function storeColor(){
    if (clickCount <= level) {
        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        clickCount +=1;
        compareInputs();
    }
    if (clickCount === level && arraysMatch) {
        userClickedPattern = [];
        clickCount = 0;
        console.log("trigger");
        nextSequence();
    } 
    if (arraysMatch == false) {
        gameOver();
    }

});


});