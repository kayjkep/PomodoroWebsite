let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let enteredTime = null;
let currentMode = "pomodoro";
let pomodoroCount = 0;

function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (isPaused) return;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(minutes, seconds);

  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    timer = null;

    if (currentMode === "pomodoro") {
      playBreakAlarm();
      pomodoroCount++;

      // Automatically switch to short or long break
      if (pomodoroCount % 4 === 0) {
        currentMode = "long";
        resetTimer(15);
      } else {
        currentMode = "short";
        resetTimer(5);
      }
    } else {
      playResumeStudyingAlarm();
      currentMode = "pomodoro";
      resetTimer(25);
    }
  } else {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      minutes--;
    }
  }
}

function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function toggleStartPause() {
  const startPauseButton = document.querySelector(".start-button");

  if (isPaused) {
    isPaused = false;
    startPauseButton.textContent = "一時停止\n Pause";
    startPauseButton.dataset.state = "running";
    if (!timer) startTimer();
  } else {
    isPaused = true;
    startPauseButton.textContent = "開始\n Start";
    startPauseButton.dataset.state = "paused";
  }
}

function playBreakAlarm() {
  const breakAudio = document.getElementById("take-a-break-sound");
  breakAudio.play();
}

function playResumeStudyingAlarm() {
  const resumeAudio = document.getElementById("resume-studying-sound");
  resumeAudio.play();
}

function resetTimer(mins) {
  clearInterval(timer);
  timer = null;
  minutes = mins;
  seconds = 0;
  isPaused = true;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(minutes, seconds);

  const startPauseButton = document.querySelector(".start-button");
  startPauseButton.textContent = "開始\n Start";
  startPauseButton.dataset.state = "paused";
}

function switchToShortBreak() {
  clearInterval(timer);
  timer = null;
  minutes = 5;
  seconds = 0;
  isPaused = true;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(minutes, seconds);

  const startPauseButton = document.querySelector(".start-button");
  startPauseButton.textContent = "開始\n Start";
  startPauseButton.dataset.state = "paused";
}

function switchToLongBreak() {
  clearInterval(timer);
  timer = null;
  minutes = 15;
  seconds = 0;
  isPaused = true;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(minutes, seconds);

  const startPauseButton = document.querySelector(".start-button");
  startPauseButton.textContent = "開始\n Start";
  startPauseButton.dataset.state = "paused";
}

document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(minutes, seconds);

  const startPauseButton = document.querySelector(".start-button");
  startPauseButton.addEventListener("click", toggleStartPause);

  document.querySelector(".pomodoro-button").addEventListener("click", () => {
    currentMode = "pomodoro";
    resetTimer(25);
  });

  document
    .querySelector(".short-break-button")
    .addEventListener("click", () => {
      currentMode = "short";
      resetTimer(5);
    });

  document.querySelector(".long-break-button").addEventListener("click", () => {
    currentMode = "long";
    resetTimer(15);
  });

  document.querySelector(".pomodoro-button").addEventListener("click", () => {
    currentMode = "pomodoro";
    resetTimer(25);
  });
});
