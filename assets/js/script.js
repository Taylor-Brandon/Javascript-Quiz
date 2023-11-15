var startButton = document.querySelector(".start-button");
var timeSection = document.querySelector(".time-left");

var timeLeft = 60;

function startTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeSection.textContent = timeLeft + " seconds left";
        if(timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000)
}

startButton.addEventListener("click", startTime);