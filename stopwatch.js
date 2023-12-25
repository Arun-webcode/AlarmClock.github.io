// let isRunning = false;
// let startTime;
// let elapsedTime = 0;
// let interval;

// function startStop() {
//   if (isRunning) {
//     // Stop the stopwatch
//     clearInterval(interval);
//     isRunning = false;
//     document.getElementById("startStopButton").textContent = "Start";
//   } else {
//     // Start the stopwatch
//     startTime = new Date().getTime() - elapsedTime;
//     interval = setInterval(updateStopwatch, 100);
//     isRunning = true;
//     document.getElementById("startStopButton").textContent = "Stop";
//   }
// }

// function updateStopwatch() {
//   const currentTime = new Date().getTime();
//   elapsedTime = currentTime - startTime;
//   displayTime(elapsedTime);
// }

// function displayTime(time) {
//   const hours = Math.floor(time / (1000 * 60 * 60))
//     .toString()
//     .padStart(2, "0");
//   const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
//     .toString()
//     .padStart(2, "0");
//   const seconds = Math.floor((time % (1000 * 60)) / 1000)
//     .toString()
//     .padStart(2, "0");
//   const milliseconds = Math.floor(time % 1000)
//     .toString()
//     .padStart(3, "0");

//   document.getElementById(
//     "stop-watch"
//   ).textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
// }
