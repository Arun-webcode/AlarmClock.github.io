const elements = ["world-clock", "alarm", "startStopButton", "timer"];

const objectClock = document.getElementsByClassName("bottom-buttons");

for (let i = 0; i < objectClock.length; i++) {
  objectClock[i].addEventListener("click", () => {
    for (let j = 0; j < elements.length; j++) {
      const element = document.getElementById(elements[j]);
      element.style.visibility = i === j ? "visible" : "hidden";
    }
  });
}
