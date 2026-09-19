// =========================
// NAMA TAMU DARI URL
// =========================

const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
    const guestElement = document.getElementById("guest");

    if (guestElement) {
        guestElement.textContent = guest;
    }
}

// =========================
// OPEN INVITATION
// =========================

const openBtn = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("music");

if(openBtn){

    openBtn.addEventListener("click", function(){

        document.getElementById("cover").style.display = "none";

        mainContent.style.display = "block";

        music.play();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

// =========================
// COUNTDOWN
// =========================

const targetDate =
new Date("December 28, 2026 10:00:00").getTime();

setInterval(function(){

    const now = new Date().getTime();

    const distance = targetDate - now;

    const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
    );

    const seconds =
    Math.floor(
    (distance % (1000 * 60))
    / 1000
    );

    document.getElementById("days").textContent =
    days;

    document.getElementById("hours").textContent =
    hours;

    document.getElementById("minutes").textContent =
    minutes;

    document.getElementById("seconds").textContent =
    seconds;

},1000);

// =========================
// RSVP KE SPREADSHEET
// =========================

const form =
document.getElementById("rsvpForm");

if(form){

form.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    const status =
    document.getElementById("statusRsvp");

    status.innerHTML =
    "Mengirim RSVP...";

    const data = {

        nama:
        document.getElementById("nama").value,

        kehadiran:
        document.getElementById("kehadiran").value,

        jumlah:
        document.getElementById("jumlah").value,

        ucapan:
        document.getElementById("ucapan").value

    };

    try{

        await fetch(
        "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec",
        {
            method:"POST",
            body:JSON.stringify(data)
        });

        status.innerHTML =
        "Terima kasih 🤍 RSVP berhasil dikirim.";

        form.reset();

    }catch(error){

        status.innerHTML =
        "Gagal mengirim RSVP.";

    }

});

}
