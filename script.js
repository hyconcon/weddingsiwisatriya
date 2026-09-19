/* =========================
   LOCK PAGE
========================= */

document.body.classList.add("lock");

/* =========================
   ELEMENTS
========================= */

const cover =
document.getElementById("cover");

const mainContent =
document.getElementById("mainContent");

const openInvitation =
document.getElementById("openInvitation");

const music =
document.getElementById("music");

/* =========================
   GUEST NAME
========================= */

const params =
new URLSearchParams(window.location.search);

const guest =
params.get("to");

if(guest){

    const guestElement =
    document.getElementById("guest");

    if(guestElement){

        guestElement.innerText =
        decodeURIComponent(guest);

    }

}

/* =========================
   OPEN INVITATION
========================= */

openInvitation.addEventListener(
"click",
function(){

    mainContent.style.display = "block";

    document.body.classList.remove("lock");

    music.play().catch(()=>{});

    cover.classList.add("hide");

    setTimeout(()=>{

        cover.style.display="none";

    },1000);

}
);

/* =========================
   FADE IN SECTION
========================= */

const reveals =
document.querySelectorAll(".reveal");

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{
threshold:0.15
}

);

reveals.forEach(item=>{

revealObserver.observe(item);

});

/* =========================
   COUNTDOWN
========================= */

const targetDate =
new Date(
"December 28, 2026 10:00:00"
).getTime();

function updateCountdown(){

const now =
new Date().getTime();

const distance =
targetDate - now;

if(distance < 0) return;

document.getElementById("days").innerText =
Math.floor(distance/(1000*60*60*24));

document.getElementById("hours").innerText =
Math.floor(
(distance%(1000*60*60*24))
/
(1000*60*60)
);

document.getElementById("minutes").innerText =
Math.floor(
(distance%(1000*60*60))
/
(1000*60)
);

document.getElementById("seconds").innerText =
Math.floor(
(distance%(1000*60))
/
1000
);

}

updateCountdown();

setInterval(
updateCountdown,
1000
);

/* =========================
   COUPLE SLIDER
========================= */

const couples = [

{
role:"THE BRIDE",
name:"Margareta Septa Prima Siwi",
parents:"Putri dari<br>Bapak Wasikin &<br>Ibu Kristiyaningsih",
photo:"images/siwi.jpg"
},

{
role:"THE GROOM",
name:"Ignatius Satriya Bagus Pradana",
parents:"Putra dari<br>Bapak Arinto Subandoko Vinc &<br>Ibu Theresia Maria Dwi Aryani",
photo:"images/satriya.jpg"
}

];

let currentCouple = 0;

function updateCouple(){

document.getElementById("coupleRole")
.innerHTML =
couples[currentCouple].role;

document.getElementById("coupleName")
.innerHTML =
couples[currentCouple].name;

document.getElementById("coupleParents")
.innerHTML =
couples[currentCouple].parents;

document.getElementById("couplePhoto")
.src =
couples[currentCouple].photo;

document
.querySelectorAll(".couple-dot")
.forEach(dot=>dot.classList.remove("active"));

document
.querySelectorAll(".couple-dot")
[currentCouple]
.classList.add("active");

}

setInterval(()=>{

currentCouple++;

if(currentCouple>=couples.length){

currentCouple=0;

}

updateCouple();

},5000);

/* =========================
   WISH FORM
========================= */

const wishForm =
document.getElementById("wishForm");

if(wishForm){

wishForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const nama =
document.getElementById("wishNama").value;

const ucapan =
document.getElementById("ucapan").value;

const card =
document.createElement("div");

card.className =
"wish-card";

card.innerHTML=`

<h4>${nama}</h4>
<p>${ucapan}</p>

`;

document
.getElementById("wishList")
.prepend(card);

wishForm.reset();

}
);

}
