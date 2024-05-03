let timerInterval;
let startTime;
let lapTimes = [];

function startStop() {
    const button = document.querySelector("#controls button:first-child");
    if (button.textContent === "Start") {
        startTimer();
        button.textContent = "Stop";
    } else {
        stopTimer();
        button.textContent = "Start";
    }
}

function startTimer() {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0);
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function reset() {
    stopTimer();
    lapTimes = [];
    updateTimerDisplay(0);
    document.getElementById("lap-times").innerHTML = "";
    document.querySelector("#controls button:first-child").textContent = "Start";
}

function recordLap() {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    lapTimes.push({ time: lapTime });
    const lapTimesElement = document.getElementById("lap-times");
    const lapTimeString = formatTime(lapTime);
    lapTimesElement.innerHTML += `<div>Lap ${lapTimes.length}: ${lapTimeString}</div>`;
    lapTimesElement.scrollTop = lapTimesElement.scrollHeight;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    updateTimerDisplay(elapsedTime);
}

function updateTimerDisplay(time) {
      const timerElement = document.getElementById("stopwatch");
    timerElement.textContent = formatTime(time);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const millisecondsFormatted = (milliseconds % 1000).toString().padStart(3, '0');

    return `${minutes}:${seconds}:${millisecondsFormatted.slice(0, 2)}`;
}
