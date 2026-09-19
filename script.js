/* =========================
   NAMA TAMU DARI URL
========================= */

const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
    document.getElementById("guest").innerText =
        decodeURIComponent(guest);
}

/* =========================
   BUKA UNDANGAN
========================= */

const openBtn = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const main = document.getElementById("mainContent");
const music = document.getElementById("music");

openBtn.addEventListener("click", () => {

    cover.style.display = "none";
    main.style.display = "block";

    music.play();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================
   COUNTDOWN
========================= */

const weddingDate =
new Date("December 28, 2026 10:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance =
    weddingDate - now;

    const days =
    Math.floor(distance /
    (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
    (distance %
    (1000 * 60 * 60 * 24))
    /
    (1000 * 60 * 60));

    const minutes =
    Math.floor(
    (distance %
    (1000 * 60 * 60))
    /
    (1000 * 60));

    const seconds =
    Math.floor(
    (distance %
    (1000 * 60))
    /
    1000);

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) d.innerText = days;
    if (h) h.innerText = hours;
    if (m) m.innerText = minutes;
    if (s) s.innerText = seconds;

}, 1000);

/* =========================
   HERO SLIDESHOW
========================= */

const heroImages = [
    "images/couple-main.jpg",
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg"
];

const heroPhoto =
document.getElementById("heroPhoto");

let heroIndex = 0;

if(heroPhoto){

setInterval(() => {

heroIndex++;

if(heroIndex >= heroImages.length){
heroIndex = 0;
}

heroPhoto.src =
heroImages[heroIndex];

},5000);

}

/* =========================
   BRIDE SLIDESHOW
========================= */

const bridePhotos = [
    "images/siwi.jpg",
    "images/siwi2.jpg",
    "images/siwi3.jpg"
];

const brideImage =
document.getElementById("brideImage");

let brideIndex = 0;

if(brideImage){

setInterval(() => {

brideIndex++;

if(brideIndex >= bridePhotos.length){
brideIndex = 0;
}

brideImage.src =
bridePhotos[brideIndex];

},4000);

}

/* =========================
   GROOM SLIDESHOW
========================= */

const groomPhotos = [
    "images/satriya.jpg",
    "images/satriya2.jpg",
    "images/satriya3.jpg"
];

const groomImage =
document.getElementById("groomImage");

let groomIndex = 0;

if(groomImage){

setInterval(() => {

groomIndex++;

if(groomIndex >= groomPhotos.length){
groomIndex = 0;
}

groomImage.src =
groomPhotos[groomIndex];

},4000);

}

/* =========================
   FADE IN SCROLL
========================= */

const reveals =
document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

reveals.forEach((item)=>{

const top =
item.getBoundingClientRect().top;

const visible = 120;

if(top < window.innerHeight - visible){
item.classList.add("active");
}

});

});

/* =========================
   RSVP + GOOGLE SHEET
========================= */

const scriptURL =
"https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";

const form =
document.getElementById("rsvpForm");

if(form){

form.addEventListener("submit",
async function(e){

e.preventDefault();

const nama =
document.getElementById("nama").value;

const kehadiran =
document.getElementById("kehadiran").value;

const jumlah =
document.getElementById("jumlah").value;

const ucapan =
document.getElementById("ucapan").value;

const status =
document.getElementById("statusRsvp");

status.innerHTML =
"Sedang mengirim...";

try{

await fetch(scriptURL,{

method:"POST",

body:JSON.stringify({

nama:nama,
kehadiran:kehadiran,
jumlah:jumlah,
ucapan:ucapan

})

});

status.innerHTML =
"Terima kasih, RSVP berhasil dikirim ❤️";

addWish(
nama,
ucapan
);

form.reset();

}catch(error){

status.innerHTML =
"Gagal mengirim RSVP";

}

});

}

/* =========================
   WEDDING WISHES
========================= */

function addWish(nama, ucapan){

if(!ucapan) return;

const list =
document.getElementById("wishList");

if(!list) return;

const card =
document.createElement("div");

card.className =
"wish-card";

card.innerHTML = `
<h4>${nama}</h4>
<p>${ucapan}</p>
`;

list.prepend(card);

}

/* =========================
   AUTO SHOW SECTION
========================= */

window.addEventListener("load",()=>{

document.querySelectorAll(".reveal")
.forEach(item=>{

const top =
item.getBoundingClientRect().top;

if(top < window.innerHeight){
item.classList.add("active");
}

});

});
