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
