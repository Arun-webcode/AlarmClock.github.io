let alarmNewCard = document.getElementById("setnew-alarm");
// set new alarm open card
function setNewAlarm() {
  alarmNewCard.style.display = "flex";
}

function setHours() {
  document.getElementById("set-time").style.display = "flex";
  document.getElementById("set-minute").style.display = "none";
}

function setMinutes() {
  document.getElementById("set-time").style.display = "none";
  document.getElementById("set-minute").style.display = "flex";
}

// it is cancel button of u want to discard new alarm or if you want to set new alarm then press ok button and new alarm will be set
let alarms = []; // Array to store upcoming alarms
let cardCounter = 1;

// Variable to track if an alarm is already set
let alarmSet = false;
// Variable to store the timeout ID
let alarmTimeout;

// Variable to store the selected AM/PM value
let ampm = "";

// Function to set the AM/PM value
function setAMPM(value) {
  ampm = value;
}

// Function to set the alarm
function okButton() {
  alarmNewCard.style.display = "none";

  // Check if an alarm is already set, and if so, prevent setting a new one
  if (alarmSet) {
    console.log(
      "Alarm is already set. Please turn it off before setting a new one."
    );
    return;
  }
  // Get values from input fields
  const newAlarmHour = document.getElementById("hours").value;
  const newAlarmMin = document.getElementById("minutes").value;

  // console.log(`hii value set is ${ampm}`);
  // check if time and every parameter is correct or not
  if (ampm === "") {
    console.log("Please select AM or PM before setting the alarm.");
    return;
  }

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

  // Get the current time
  const now = new Date();

  // Create a Date object for the specified alarm time
  const alarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    convertTo24HourFormat(newAlarmHour, ampm),
    newAlarmMin,
    0,
    0
  );

  // Calculate the time difference between now and the alarm time
  const timeDiff = alarmTime - now;

  // Check if the specified time is in the future
  if (timeDiff <= 0) {
    console.log("Please set a future time for the alarm.");
    return;
  }

  // setTimeout(() => {
  //Generate new card from here
  const cardContainer = document.getElementById("card-container");

  // Create a new div element to display the alarm information
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${cardCounter}`;
  card.innerHTML = `<div >${newAlarmHour}:${newAlarmMin} <span style="font-size: 10px">${ampm}</span>

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

                 <span id="toggle-snooze-win" onclick="toggleSnooze()">
                 <div id="slider-snooze-win"></div>
                 </span>

                </div>`;

  // Append the card to the card container
  cardContainer.appendChild(card);

  let newAlarm = { hour: newAlarmHour, min: newAlarmMin };
  alarms.push(newAlarm);

  // Set a timeout for the alert to trigger when the alarm time is reached
  alarmTimeout = setTimeout(() => {
    if (alarmSet) {
      alert("Alarm time complete. Please turn it off.");
      // Reset the alarmSet variable after the alert is shown
      alarmSet = false;
    }
  }, timeDiff);

  // Set the alarmSet variable to true to prevent setting multiple alarms simultaneously
  alarmSet = true;
  ampm = "";
  // Increment the card counter
  cardCounter++;
}

// Function to convert the hour to 24-hour format
function convertTo24HourFormat(hour, ampm) {
  // Get the current time
  const now = new Date();
  const currentHour = now.getHours();
  if (ampm === "AM" && hour >= currentHour) {
    return hour;
  } else if (ampm === "PM" && hour + 12 >= currentHour) {
    return hour + 12;
  } else if (ampm === "AM" && hour < currentHour && currentHour < 12) {
    return hour + 12;
  } else if (ampm === "PM" && hour < currentHour && currentHour < 12) {
    return hour + 24;
  } else if (ampm === "AM" && hour + 12 < currentHour && currentHour >= 12) {
    return hour;
  } else {
    return hour + 12;
  }
}

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

// Close the popup if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".material-symbols-outlined")) {
    var popup = document.getElementById(`myPopup-${cardCounter}`);
    if (popup.style.display === "flex") {
      popup.style.display = "none";
    }
  }
};

function deleteCard(cardId) {
  const cardToRemove = document.getElementById(`card-${cardId}`);
  if (cardToRemove) {
    // Clear the timeout associated with the deleted card
    clearTimeout(alarmTimeout);
    // Remove the card from the DOM
    cardToRemove.remove();
    // Remove the deleted alarm from the 'alarms' array
    alarms.splice(cardId - 1, 1);
    // Update the alarmSet variable based on the remaining alarms
    alarmSet = alarms.length > 0;
    alert(`Card ${cardId} deleted`);
  } else {
    alert(`Card ${cardId} not found`);
  }
}

// for cancelling the set new alarm
function cancelButton() {
  alarmNewCard.style.display = "none";
}

// it is toggleSnooze on/off button on card
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
