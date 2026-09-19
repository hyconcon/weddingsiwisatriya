/* ==========================
   CONFIG
========================== */

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";

/* ==========================
   COVER + OPEN INVITATION
========================== */

document.body.classList.add("lock");

const cover =
document.getElementById("cover");

const mainContent =
document.getElementById("mainContent");

const openButton =
document.getElementById("openInvitation");

const music =
document.getElementById("music");

openButton.addEventListener("click", () => {

    cover.classList.add("hide");

    document.body.classList.remove("lock");

    mainContent.style.display = "block";

    music.play().catch(() => {});

    setTimeout(() => {

        cover.style.display = "none";

    }, 1000);

});

/* ==========================
   NAMA TAMU
========================== */

const params =
new URLSearchParams(window.location.search);

const guest =
params.get("to");

if (guest) {

    document.getElementById("guestName").innerText =
    decodeURIComponent(guest);

}

/* ==========================
   FADE IN SECTION
========================== */

const sections =
document.querySelectorAll(".fade-section");

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

sections.forEach(section=>{

observer.observe(section);

});

/* ==========================
   COUNTDOWN
========================== */

const weddingDate =
new Date("December 28, 2026 10:00:00").getTime();

function updateCountdown(){

const now =
new Date().getTime();

const distance =
weddingDate - now;

if(distance < 0){

return;
}

const days =
Math.floor(distance / (1000*60*60*24));

const hours =
Math.floor(
(distance % (1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(distance % (1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(distance % (1000*60))
/
1000
);

document.getElementById("days").innerText =
days;

document.getElementById("hours").innerText =
hours;

document.getElementById("minutes").innerText =
minutes;

document.getElementById("seconds").innerText =
seconds;

}

updateCountdown();

setInterval(
updateCountdown,
1000
);

/* ==========================
   COUPLE SLIDER
========================== */

const coupleCards =
document.querySelectorAll(".couple-card");

let coupleIndex = 0;

function rotateCouple(){

coupleCards.forEach(card=>{

card.classList.remove("active");

});

coupleIndex++;

if(coupleIndex >= coupleCards.length){

coupleIndex = 0;

}

coupleCards[coupleIndex]
.classList.add("active");

}

setInterval(
rotateCouple,
5000
);

/* ==========================
   RSVP FORM
========================== */

const rsvpForm =
document.getElementById("rsvpForm");

if(rsvpForm){

rsvpForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const nama =
document.getElementById("nama").value;

const kehadiran =
document.getElementById("kehadiran").value;

const jumlah =
document.getElementById("jumlah").value;

const payload = {

nama,
kehadiran,
jumlah,
ucapan:""

};

try{

await fetch(
SCRIPT_URL,
{
method:"POST",
body:JSON.stringify(payload)
}
);

document.getElementById("statusRsvp").innerHTML =
"Terima kasih atas konfirmasinya 🤍";

rsvpForm.reset();

}catch(error){

document.getElementById("statusRsvp").innerHTML =
"Gagal mengirim RSVP";

}

});
}

/* ==========================
   WEDDING WISHES
========================== */

const wishForm =
document.getElementById("wishForm");

if(wishForm){

wishForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const nama =
document.getElementById("wishName").value;

const ucapan =
document.getElementById("wishMessage").value;

const wishCard =
document.createElement("div");

wishCard.className =
"wish-card";

wishCard.innerHTML = `

<h4>${nama}</h4>
<p>${ucapan}</p>

`;

document
.getElementById("wishList")
.prepend(wishCard);

const payload = {

nama,
kehadiran:"",
jumlah:"",
ucapan

};

try{

await fetch(
SCRIPT_URL,
{
method:"POST",
body:JSON.stringify(payload)
}
);

}catch(error){

console.log(error);

}

wishForm.reset();

});
}

/* ==========================
   BOTTOM NAV ACTIVE
========================== */

const navLinks =
document.querySelectorAll(".bottom-nav a");

window.addEventListener(
"scroll",
()=>{

let current = "";

document
.querySelectorAll("section")
.forEach(section=>{

const top =
section.offsetTop - 150;

if(window.scrollY >= top){

current = section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add("active");

}

});

});
