// function updateDigitalClock() {
//     const now = new Date();
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     const dayOfWeek = daysOfWeek[now.getDay()];
//     const dayOfMonth = now.getDate();
//     const month = months[now.getMonth()];
//     const year = now.getFullYear();

//     let hours = now.getHours();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12; // Convert to 12-hour format
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');

//     const digitalClock = document.getElementById('world-clock');
//     digitalClock.textContent = ` ${hours}:${minutes}:${seconds}
//     ${ampm} ${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
// }

// setInterval(updateDigitalClock, 1000);
// updateDigitalClock();  // Update immediately on page load
