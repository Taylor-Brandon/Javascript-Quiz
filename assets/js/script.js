var timeSection = document.querySelector(".time-left");
var question = document.querySelector("#question");
var choiceA = document.querySelector(".c-1");
var choiceB = document.querySelector(".c-2");
var choiceC = document.querySelector(".c-3");
var choiceD = document.querySelector(".c-4");
var startButton = document.querySelector(".start-button");
var next = document.querySelector(".next-button");
var prev = document.querySelector(".prev-button");

var questionCard = document.querySelector(".question-card");

var timeLeft = 15;
var questionIndex = 0;
var index = 0;
var timerInterval;
var currentQuestion;


var questions = [
    {
        questionText: "What color is the sky?",
        choices: ["A: Red", "B: Purple", "C: Blue", "D: Yellow"],
    },
    {
        questionText: "What color is the grass?",
        choices: ["A: Blue", "B: Purple", "C: Green", "D: Yellow"],
    },
];

function startTime() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timeSection.textContent = timeLeft + " seconds left";
        checkGameStatus();
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            alert("Game Over!");
        }
    }, 1000);
    promptQuestion();
}

function promptQuestion() {
    if(questionIndex < questions.length) {
         currentQuestion = questions[questionIndex];
        question.textContent = currentQuestion.questionText;
        choiceA.textContent = currentQuestion.choices[0];
       choiceB.textContent = currentQuestion.choices[1];
       choiceC.textContent = currentQuestion.choices[2];
       choiceD.textContent = currentQuestion.choices[3];
        addChoice();
        questionIndex++;
    }
}

function addChoice() {
    questionCard.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches("li")) {
            var selectedChoice = element.textContent.trim();
            if (!correctChoice(selectedChoice)) {
                timeLeft -= 10;
                timeSection.textContent = timeLeft + " seconds left";
            }
            element.setAttribute("style", correctChoice(selectedChoice) ? "color: green;" : "color: red;");
        }
    });
 }

 function correctChoice(selectedChoice) {
    var correctChoiceIndex = currentQuestion.choices.findIndex(choice => choice.includes("C: Blue") || choice.includes("C: Green"));
    return selectedChoice === currentQuestion.choices[correctChoiceIndex];
}


function checkAnswer(selectedChoice) {
    if (!correctChoice(selectedChoice)) {
        timeLeft -= 10;
        timeSection.textContent = timeLeft + " seconds left";
    } else {
        alert("Correct");
    }
    checkGameStatus();
    // Update the display logic here
}

function navigation(direction) {
    index = index + direction;
    if(index < 0) {
        index = questions.length - 1;
    } else if(index > questions.length - 1) {
        index = 0;
    }
    questionIndex = index;
    promptQuestion();
 }
 

 next.addEventListener("click", function(event) {
    event.stopPropagation();
    navigation(1);
    clearChoice();
 });
 
 
 prev.addEventListener("click", function(event) {
    event.stopPropagation();
    navigation(-1);
    clearChoice();
 });
 function clearChoice() {
    choiceA.setAttribute("style", "color: black;");
    choiceB.setAttribute("style", "color: black;");
    choiceC.setAttribute("style", "color: black;");
    choiceD.setAttribute("style", "color: black;");
 }
 function checkGameStatus() {
    // Check if all questions have been answered
    if (questionIndex === questions.length || timeLeft <= 0) {
        clearInterval(timerInterval);

        // Prompt the user for initials
        var userInitials = prompt("Enter your initials:");

        // Save the initials and score in local storage
        saveScore(userInitials, calculateScore());

        // Display the final score or redirect the user, etc.
        alert("Game Over! Your score is: " + calculateScore());
    }
}

function calculateScore() {
    // You can implement your scoring logic here based on correct answers, time remaining, etc.
    // For simplicity, let's say the score is the remaining time
    return Math.max(0, timeLeft);
}
function saveScore(initials, score) {
    // Retrieve existing scores from local storage or initialize an empty array
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the new score to the array
    highScores.push({ initials: initials, score: score });

    // Sort the scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top N scores (adjust as needed)
    highScores = highScores.slice(0, 10);

    // Save the updated scores back to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
 



choiceB.addEventListener("click", function() {
    checkAnswer(choiceB.textContent.trim());
});

choiceC.addEventListener("click", function() {
    checkAnswer(choiceC.textContent.trim());
});


 startButton.addEventListener("click", startTime);

 