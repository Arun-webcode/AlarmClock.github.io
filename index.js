let objectClock = document.getElementsByClassName("bottom-buttons");

objectClock[0].addEventListener("click", () => {
  document.getElementById("world-clock").style.display = "flex";
  document.getElementById("alarm").style.display = "none";
  document.getElementById("stop-watch").style.display = "none";
  document.getElementById("timer").style.display = "none";
});

objectClock[1].addEventListener("click", () => {
  document.getElementById("world-clock").style.display = "none";
  document.getElementById("alarm").style.display = "flex";
  document.getElementById("stop-watch").style.display = "none";
  document.getElementById("timer").style.display = "none";
});

objectClock[2].addEventListener("click", () => {
  document.getElementById("world-clock").style.display = "none";
  document.getElementById("alarm").style.display = "none";
  document.getElementById("stop-watch").style.display = "flex";
  document.getElementById("timer").style.display = "none";
});

objectClock[3].addEventListener("click", () => {
  document.getElementById("world-clock").style.display = "none";
  document.getElementById("alarm").style.display = "none";
  document.getElementById("stop-watch").style.display = "none";
  document.getElementById("timer").style.display = "flex";
});
