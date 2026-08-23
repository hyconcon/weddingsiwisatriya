// Nama Tamu
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if(guest){
document.getElementById("guestName").innerHTML = guest;
}

// Countdown
const weddingDate = new Date("December 28, 2026 10:00:00").getTime();

setInterval(() => {

const now = new Date().getTime();

const distance = weddingDate - now;

const days = Math.floor(distance / (1000*60*60*24));

const hours = Math.floor(
(distance % (1000*60*60*24))
/
(1000*60*60)
);

const minutes = Math.floor(
(distance % (1000*60*60))
/
(1000*60)
);

const seconds = Math.floor(
(distance % (1000*60))
/
1000
);

document.getElementById("days").innerHTML = days;
document.getElementById("hours").innerHTML = hours;
document.getElementById("minutes").innerHTML = minutes;
document.getElementById("seconds").innerHTML = seconds;

},1000);
