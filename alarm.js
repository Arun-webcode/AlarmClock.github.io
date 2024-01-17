// for selecting ifferent type of functionalities this for loop is used.

let objectClock = document.getElementsByClassName("bottom-buttons");
let sections = ["world-clock", "alarm", "stop-watch", "timer"];

for (let i = 0; i < objectClock.length; i++) {
  objectClock[i].addEventListener("click", () => {
    for (let j = 0; j < sections.length; j++) {
      document.getElementById(sections[j]).style.display =
        i === j ? "flex" : "none";
    }
  });
}

// World Clock logic is starting from here
function updateClock() {
  const now = new Date();

  // Analog Clock
  const hour = (now.getHours() % 12) + now.getMinutes() / 60;
  const minute = now.getMinutes() + now.getSeconds() / 60;
  const second = now.getSeconds();

  document.getElementById("hour").style.transform = `rotate(${
    (hour / 12) * 360
  }deg)`;
  document.getElementById("minute").style.transform = `rotate(${
    (minute / 60) * 360
  }deg)`;
  document.getElementById("second").style.transform = `rotate(${
    (second / 60) * 360
  }deg)`;

  // Digital Clock
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = now.toDateString();

  document.getElementById("time").innerText = timeString;
  document.getElementById("date").innerText = dateString;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock immediately
updateClock();

// Alarm Clock logic starts from here
// Get the reference to the set new alarm card
let alarmNewCard = document.getElementById("setnew-alarm");

// Function to open the set new alarm card
function setNewAlarm() {
  alarmNewCard.style.display = "flex";
}

// Functions to handle setting hours and minutes
function setHours() {
  document.getElementById("set-time").style.display = "flex";
  document.getElementById("set-minute").style.display = "none";
}

function setMinutes() {
  document.getElementById("set-time").style.display = "none";
  document.getElementById("set-minute").style.display = "flex";
}

// Create an Audio object for the alarm ringtone
const ring = new Audio("Alarm-ringtone.mp3");
ring.loop = true;

// Array to store upcoming alarms
let alarms = [];

// Counter for creating unique card IDs
let cardCounter = 0;

// Variable to store the timeout ID
let alarmTimeout;

// Variable to store the selected AM/PM value
let ampm = "";

// Function to set the AM/PM value
function setAMPM(value) {
  ampm = value;
}

// Function to update the clock and check for alarms
function updatealarmClock() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentAmPm = currentHour >= 12 ? "PM" : "AM";
  console.log("Alarm ringing...");
  // Check if any alarms match the current time
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i] === `${currentHour}:${currentMin} ${currentAmPm}`) {
      console.log("Alarm ringing...");
      ring.load();
      ring.play();
    }
  }
}

// Function to initialize the clock and update it every second
function initClock() {
  console.log("Alarm ringing...");
  updatealarmClock();
  setInterval(updatealarmClock, 1000);
}

// Function to handle setting a new alarm
function okButton() {
  alarmNewCard.style.display = "none";

  // Get values from input fields
  let newAlarmHour = document.getElementById("hours").value;
  const newAlarmMin = document.getElementById("minutes").value;

  // Check if time and every parameter is correct or not
  if (ampm === "") {
    alert("Please select AM or PM before setting the alarm.");
    return;
  }

  // Validate the input parameters for the new alarm
  if (
    ampm === "undefined" ||
    newAlarmHour === "" ||
    newAlarmMin === "" ||
    isNaN(newAlarmHour) ||
    isNaN(newAlarmMin) ||
    newAlarmHour < 0 ||
    newAlarmHour > 11 ||
    newAlarmMin < 0 ||
    newAlarmMin > 59
  ) {
    alert("Invalid input. Please enter valid hours and minutes.");
    return;
  }

  // Generate new card
  const cardContainer = document.getElementById("card-container");

  // Create a new div element to display the alarm information
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${cardCounter}`;
  card.innerHTML = `<div>${newAlarmHour}:${newAlarmMin} <span style="font-size: 10px">${ampm}</span>

                <sup id="more_vert"
                 style="font-size: 16px" 
                 class="material-symbols-outlined" 
                 onclick="togglePopUp(event, ${cardCounter})"
                 >more_vert
                 </sup>

                 <div id="myPopup-${cardCounter}" class="popup">
                 <button class="del-dis-btn" onclick="deleteCard(${cardCounter})">Delete</button>
                 <button class="del-dis-btn">Disable</button>
                 </div>

                 <div id="repeat-show">Repeat:</div>
                 <div id="sound-show">Sound:</div>

                 <span id="toggle-snooze-win" onclick="toggleSnooze(${cardCounter})">
                 <div id="slider-snooze-win"></div>
                 </span>

                </div>`;

  // Append the card to the card container
  cardContainer.appendChild(card);

  // Convert the time to 24-hour format
  let numberalHours = Number(newAlarmHour);
  if (ampm === "PM") {
    numberalHours += 12;
  }

  let newAlarm = `${numberalHours}:${Number(newAlarmMin)} ${ampm}`;

  // Add the new alarm to the array
  alarms.push(newAlarm);

  // Reset the AM/PM variable
  ampm = "";

  // Increment the card counter
  cardCounter++;
}

// Function to toggle the visibility of the popup for each card
function togglePopUp(event, cardCounter) {
  var popup = document.getElementById(`myPopup-${cardCounter}`);

  // Calculate the position of the popup based on the clicked icon
  var iconRect = event.target.getBoundingClientRect();
  var cardRect = event.target.parentElement.getBoundingClientRect();

  var topOffset = iconRect.top - cardRect.top;
  var leftOffset = iconRect.left - cardRect.left;

  // Set the position of the popup
  popup.style.top = topOffset + "px";
  popup.style.left = leftOffset + "px";

  // Toggle the display of the popup
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// Function to delete a card
function deleteCard(cardId) {
  const cardToRemove = document.getElementById(`card-${cardId}`);
  if (cardToRemove) {
    // Clear the timeout associated with the deleted card
    clearTimeout(alarmTimeout);
    // Remove the card from the DOM
    cardToRemove.remove();
    // Remove the deleted alarm from the 'alarms' array
    alarms.splice(cardId - 1, 1);
    // Update the card counter
    cardCounter--;
  } else {
    alert(`Card ${cardId} not found`);
  }
}

// Function to cancel setting a new alarm
function cancelButton() {
  alarmNewCard.style.display = "none";
}

// Function to toggle snooze on/off for each card
let toggle_snooze = document.getElementById("toggle-snooze");
let isToggle = true;

function toggleSnooze() {
  if (isToggle) {
    toggle_snooze.style.justifyContent = "right";
    toggle_snooze.style.background = "rgb(2, 101, 2)";
    document.getElementById("slider-snooze").style.background = "white";
    isToggle = false;
  } else {
    toggle_snooze.style.justifyContent = "left";
    isToggle = true;
    toggle_snooze.style.background = "rgba(155, 201, 155, 0.806)";
    document.getElementById("slider-snooze").style.background =
      "rgb(165, 162, 162)";
  }
}

// StopWatch code logic starting from here
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
