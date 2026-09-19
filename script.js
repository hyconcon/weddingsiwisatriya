/* ===================================
   NAMA TAMU DARI URL
=================================== */

const params = new URLSearchParams(window.location.search);

const guestName = params.get("to");

if (guestName) {
    document.getElementById("guest").textContent = guestName;
}

/* ===================================
   OPEN INVITATION
=================================== */

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("music");

openButton.addEventListener("click", () => {

    cover.style.opacity = "0";

    setTimeout(() => {
        cover.style.display = "none";
    }, 800);

    mainContent.style.display = "block";

    document.body.style.overflowY = "auto";

    music.play().catch(() => {
        console.log("Autoplay diblokir browser");
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ===================================
   COUNTDOWN
=================================== */

const targetDate = new Date(
    "December 28, 2026 10:00:00"
).getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );

    document.getElementById("days").textContent =
        days > 0 ? days : 0;

    document.getElementById("hours").textContent =
        hours > 0 ? hours : 0;

    document.getElementById("minutes").textContent =
        minutes > 0 ? minutes : 0;

    document.getElementById("seconds").textContent =
        seconds > 0 ? seconds : 0;
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* ===================================
   FOTO MEMPELAI BERGANTI
=================================== */

const bridePhotos = [
    "images/siwi.jpg",
    "images/siwi2.jpg",
    "images/siwi3.jpg"
];

const groomPhotos = [
    "images/satriya.jpg",
    "images/satriya2.jpg",
    "images/satriya3.jpg"
];

let brideIndex = 0;
let groomIndex = 0;

setInterval(() => {

    const bridePhoto =
        document.getElementById("bridePhoto");

    if (!bridePhoto) return;

    brideIndex++;

    if (brideIndex >= bridePhotos.length) {
        brideIndex = 0;
    }

    bridePhoto.src =
        bridePhotos[brideIndex];

}, 4000);

setInterval(() => {

    const groomPhoto =
        document.getElementById("groomPhoto");

    if (!groomPhoto) return;

    groomIndex++;

    if (groomIndex >= groomPhotos.length) {
        groomIndex = 0;
    }

    groomPhoto.src =
        groomPhotos[groomIndex];

}, 4500);

/* ===================================
   FADE IN SECTION
=================================== */

const sections =
    document.querySelectorAll(".fade-section");

function revealSections() {

    sections.forEach(section => {

        const top =
            section.getBoundingClientRect().top;

        if (
            top <
            window.innerHeight - 100
        ) {
            section.classList.add("show");
        }

    });

}

window.addEventListener(
    "scroll",
    revealSections
);

revealSections();

/* ===================================
   RSVP + GOOGLE SHEET
=================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async function (e) {

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
                "Mengirim RSVP...";

            try {

                await fetch(
                    "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            nama,
                            kehadiran,
                            jumlah,
                            ucapan
                        })
                    }
                );

                status.innerHTML =
                    "Terima kasih ❤️ RSVP berhasil dikirim";

                /* tampilkan wishes */

                if (ucapan.trim() !== "") {

                    const card =
                        document.createElement("div");

                    card.className =
                        "wish-card";

                    card.innerHTML = `
                        <h4>${nama}</h4>
                        <p>${ucapan}</p>
                    `;

                    document
                        .getElementById("wishList")
                        .prepend(card);

                }

                rsvpForm.reset();

            } catch (error) {

                console.error(error);

                status.innerHTML =
                    "Gagal mengirim RSVP";

            }

        }
    );

}

/* ===================================
   SMOOTH BOTTOM NAV
=================================== */

document
.querySelectorAll('.bottom-nav a')
.forEach(anchor => {

    anchor.addEventListener(
        'click',
        function(e){

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute('href')
                );

            if(target){

                target.scrollIntoView({
                    behavior:'smooth'
                });

            }

        }
    );

});
