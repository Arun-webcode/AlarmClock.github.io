window.onload = () => {
  let seconds = 0;
  let tens = 0;

  const Seconds = document.querySelector(".seconds");
  const Tens = document.querySelector(".tens");
  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const resetBtn = document.querySelector(".reset");

  let Interval = 0;

  startBtn.addEventListener("click", () => {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  });
  stopBtn.addEventListener("click", () => {
    clearInterval(Interval);
  });
  resetBtn.addEventListener("click", () => {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    Tens.innerHTML = tens;
    Seconds.innerHTML = seconds;
  });

  function startTimer() {
    tens++;
    if (tens <= 9) {
      Tens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
      Tens.innerHTML = tens;
    }
    if (tens > 99) {
      seconds++;
      Seconds.innerHTML = "0" + seconds;
      tens = 0;
      Tens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
      Seconds.innerHTML = seconds;
    }
  }
};
