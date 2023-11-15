var startButton = document.querySelector(".start-button");
var timeSection = document.querySelector(".time-left");
var question = document.querySelector("#question");
var choiceA = document.querySelector(".c-1");
var choiceB = document.querySelector(".c-2");
var choiceC = document.querySelector(".c-3");
var choiceD = document.querySelector(".c-4");
var questionCard = document.querySelector(".question-card");

var timeLeft = 60;

function startTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeSection.textContent = timeLeft + " seconds left";
        if(timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    promptQuestion();
}

function promptQuestion() {
    question.textContent = "What is your favorite season?";
    choiceA.textContent = "A: Summer";
    choiceB.textContent = "B: Spring";
    choiceC.textContent = "C: Winter";
    choiceD.textContent = "D: Fall";
    AddChoice();
}

function AddChoice() {
    questionCard.addEventListener("click", function(event) {
        var element = event.target;
        if(element.matches("li")) {
            element.setAttribute("style", "color: blue;");
        }
    })
}


function clearQuestion() {
    question.textContent = "";
    choiceA.textContent = "A: ";
    choiceB.textContent = "B: ";
    choiceC.textContent = "C: ";
    choiceD.textContent = "D: ";
}

startButton.addEventListener("click", startTime);