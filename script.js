const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if (guest) {
  document.getElementById("guest").innerHTML = guest;
}

const target =
new Date("December 28, 2026 10:00:00").getTime();

setInterval(() => {

const now = new Date().getTime();

const distance = target - now;

document.getElementById("days").innerHTML =
Math.floor(distance / (1000*60*60*24));

document.getElementById("hours").innerHTML =
Math.floor((distance%(1000*60*60*24))/(1000*60*60));

document.getElementById("minutes").innerHTML =
Math.floor((distance%(1000*60*60))/(1000*60));

document.getElementById("seconds").innerHTML =
Math.floor((distance%(1000*60))/1000);

},1000);
