// let newAlarmHour = document.getElementById("hours").value;
// let newAlarmMin = document.getElementById("minutes").value;

// let newAlarm = {
//   hour: newAlarmHour,
//   minute: newAlarmMin,
// };

// alarm.push(newAlarm);

// yahan se space

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

function okButton() {
  alarmNewCard.style.display = "none";

  let newAlarmHour = document.getElementById("hours").value;
  let newAlarmMin = document.getElementById("minutes").value;

  // setTimeout(() => {
  //Generate new card from here
  const cardContainer = document.getElementById("card-container");
  // Create a new card div
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${cardCounter}`;
  card.innerHTML = `<div style="font-size: 20px">${newAlarmHour}:${newAlarmMin} <span style="font-size: 11px">PM</span>
                <sup id="more_vert"
                 style="font-size: 16px" 
                 class="material-symbols-outlined" 
                 onclick="togglePopUp()"
                 >more_vert
                 </sup>
                 <div id="myPopup" class="popup">
                 <button class="del-dis-btn" onclick="deleteCard(${cardCounter})">Delete</button>
                 <button class="del-dis-btn">Disable</button>
                 </div>
                 <div>Repeat:</div>
                 <div>Sound:</div>
                 <span id="toggle-snooze-win" onclick="toggleSnooze()">
                 <div id="slider-snooze-win"></div>
                 </span>
                    </div>
                `;

  // Append the card to the card container
  cardContainer.appendChild(card);

  // Increment the card counter
  cardCounter++;
  // });

  if (
    isNaN(newAlarmHour) ||
    isNaN(newAlarmMin) ||
    newAlarmHour < 0 ||
    newAlarmHour > 23 ||
    newAlarmMin < 0 ||
    newAlarmMin > 59
  ) {
    alert("Invalid input. Please enter valid hours and minutes.");
    return;
  }

  let newAlarm = { hour: newAlarmHour, min: newAlarmMin };
  alarms.push(newAlarm);
}

function togglePopUp() {
  var popup = document.getElementById("myPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// Close the popup if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".material-symbols-outlined")) {
    var popup = document.getElementById("myPopup");
    if (popup.style.display === "block") {
      popup.style.display = "none";
    }
  }
};

// for deleting the card
function deleteCard(cardId) {
  const cardToRemove = document.getElementById(`card-${cardId}`);
  if (cardToRemove) {
    cardToRemove.remove();
    // alert(`Card ${cardId} deleted`);
  } else {
    // alert(`Card ${cardId} not found`);
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
