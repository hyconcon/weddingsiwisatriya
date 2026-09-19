/* =========================================================
   CONFIGURATION
========================================================= */

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";


/* =========================================================
   GUEST NAME DARI URL
   Contoh:
   ?to=Eoni
========================================================= */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guest =
        params.get("to");

    const guestElement =
        document.getElementById("guest");

    if (!guestElement) {
        return;
    }

    if (guest && guest.trim() !== "") {

        guestElement.textContent =
            decodeURIComponent(
                guest
            ).replace(/\+/g, " ");

    }

}


/* =========================================================
   OPEN INVITATION
========================================================= */

const openInvitation =
    document.getElementById(
        "openInvitation"
    );

const cover =
    document.getElementById("cover");

const mainContent =
    document.getElementById(
        "mainContent"
    );

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById(
        "musicButton"
    );


openInvitation.addEventListener(
    "click",
    () => {

        cover.classList.add(
            "cover-opened"
        );

        mainContent.classList.add(
            "main-visible"
        );


        music.volume = 0.35;

        music.play()
            .then(() => {

                musicButton.textContent =
                    "♫";

            })
            .catch(() => {

                console.log(
                    "Autoplay diblokir browser."
                );

            });


        setTimeout(() => {

            document
                .getElementById("opening")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 350);

    }
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

let musicPlaying = false;


musicButton.addEventListener(
    "click",
    () => {

        if (
            music.paused
        ) {

            music.play()
                .then(() => {

                    musicPlaying = true;

                    musicButton.textContent =
                        "♫";

                });

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "♪";

        }

    }
);


/* =========================================================
   FADE IN / REVEAL SAAT SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        /*
                         * Setelah muncul,
                         * tidak perlu diamati
                         * lagi.
                         */

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -60px 0px"
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   COUPLE SLIDER
   SATU-SATU DAN GANTI OTOMATIS
========================================================= */

const coupleData = [

    {
        role: "THE BRIDE",

        name:
            "Margareta Septa Prima Siwi",

        parents:
            "Putri dari<br>Bapak Wasikin & Ibu Kristiyaningsih",

        image:
            "images/siwi.jpg"
    },

    {
        role: "THE GROOM",

        name:
            "Ignatius Satriya Bagus Pradana",

        parents:
            "Putra dari<br>Bapak Arinto Subandoko Vinc & Ibu Theresia Maria Dwi Aryani",

        image:
            "images/satriya.jpg"
    }

];


let coupleIndex = 0;


const couplePhoto =
    document.getElementById(
        "couplePhoto"
    );

const coupleRole =
    document.getElementById(
        "coupleRole"
    );

const coupleName =
    document.getElementById(
        "coupleName"
    );

const coupleParents =
    document.getElementById(
        "coupleParents"
    );

const coupleDots =
    document.querySelectorAll(
        ".couple-dot"
    );


function changeCouple(
    index
) {

    if (
        !couplePhoto ||
        !coupleRole ||
        !coupleName ||
        !coupleParents
    ) {
        return;
    }


    const person =
        coupleData[index];


    couplePhoto.classList.add(
        "fade-photo"
    );


    setTimeout(() => {

        couplePhoto.src =
            person.image;

        couplePhoto.alt =
            person.name;

        coupleRole.textContent =
            person.role;

        coupleName.textContent =
            person.name;

        coupleParents.innerHTML =
            person.parents;


        coupleDots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );


        couplePhoto.classList.remove(
            "fade-photo"
        );

    }, 350);

}


function nextCouple() {

    coupleIndex++;

    if (
        coupleIndex >=
        coupleData.length
    ) {

        coupleIndex = 0;

    }

    changeCouple(
        coupleIndex
    );

}


/*
 * Ganti foto setiap 5 detik.
 */

setInterval(
    nextCouple,
    5000
);


/*
 * Klik titik.
 */

coupleDots.forEach(
    (dot) => {

        dot.addEventListener(
            "click",
            () => {

                coupleIndex =
                    Number(
                        dot.dataset.couple
                    );

                changeCouple(
                    coupleIndex
                );

            }
        );

    }
);


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "December 28, 2026 10:00:00 GMT+0700"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    const days =
        document.getElementById(
            "days"
        );

    const hours =
        document.getElementById(
            "hours"
        );

    const minutes =
        document.getElementById(
            "minutes"
        );

    const seconds =
        document.getElementById(
            "seconds"
        );


    if (
        distance <= 0
    ) {

        days.textContent = "0";

        hours.textContent = "0";

        minutes.textContent = "0";

        seconds.textContent = "0";

        return;

    }


    const totalSeconds =
        Math.floor(
            distance / 1000
        );


    const dayValue =
        Math.floor(
            totalSeconds /
            (60 * 60 * 24)
        );


    const hourValue =
        Math.floor(
            (
                totalSeconds %
                (60 * 60 * 24)
            ) /
            (60 * 60)
        );


    const minuteValue =
        Math.floor(
            (
                totalSeconds %
                (60 * 60)
            ) /
            60
        );


    const secondValue =
        totalSeconds %
        60;


    days.textContent =
        dayValue;

    hours.textContent =
        String(
            hourValue
        ).padStart(2, "0");

    minutes.textContent =
        String(
            minuteValue
        ).padStart(2, "0");

    seconds.textContent =
        String(
            secondValue
        ).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   RSVP
========================================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const statusRsvp =
    document.getElementById(
        "statusRsvp"
    );

const submitRsvp =
    document.getElementById(
        "submitRsvp"
    );


rsvpForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const nama =
            document.getElementById(
                "nama"
            ).value.trim();


        const kehadiran =
            document.getElementById(
                "kehadiran"
            ).value;


        const jumlah =
            document.getElementById(
                "jumlah"
            ).value;


        if (
            !nama ||
            !kehadiran ||
            !jumlah
        ) {

            statusRsvp.textContent =
                "Mohon lengkapi data RSVP.";

            return;

        }


        submitRsvp.disabled =
            true;

        submitRsvp.textContent =
            "Mengirim...";


        statusRsvp.textContent =
            "Sedang mengirim RSVP...";


        const data = {

            nama:
                nama,

            kehadiran:
                kehadiran,

            jumlah:
                jumlah,

            ucapan:
                ""

        };


        try {

            /*
             * Body dikirim sebagai string JSON.
             *
             * Google Apps Script akan membaca:
             * e.postData.contents
             */

            await fetch(
                SCRIPT_URL,
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            data
                        )
                }
            );


            statusRsvp.textContent =
                "Terima kasih, RSVP Anda sudah terkirim. 🤍";


            /*
             * Simpan nama RSVP supaya
             * otomatis menjadi nama
             * pada form Wedding Wishes.
             */

            const wishNama =
                document.getElementById(
                    "wishNama"
                );

            if (wishNama) {

                wishNama.value =
                    nama;

            }


            /*
             * Scroll perlahan ke
             * Wedding Wishes.
             */

            setTimeout(
                () => {

                    document
                        .getElementById(
                            "wishes"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                },
                700
            );


        } catch (error) {

            console.error(
                error
            );

            statusRsvp.textContent =
                "RSVP belum dapat dikirim. Silakan coba lagi.";

        }


        submitRsvp.disabled =
            false;

        submitRsvp.textContent =
            "Kirim RSVP";

    }
);


/* =========================================================
   WEDDING WISHES
========================================================= */

const wishForm =
    document.getElementById(
        "wishForm"
    );

const wishList =
    document.getElementById(
        "wishList"
    );


wishForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const wishNama =
            document.getElementById(
                "wishNama"
            ).value.trim();


        const ucapan =
            document.getElementById(
                "ucapan"
            ).value.trim();


        if (
            !wishNama ||
            !ucapan
        ) {

            return;

        }


        /*
         * Buat card ucapan baru.
         */

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "wish-card";


        const title =
            document.createElement(
                "h4"
            );

        title.textContent =
            wishNama;


        const message =
            document.createElement(
                "p"
            );

        message.textContent =
            ucapan;


        card.appendChild(
            title
        );

        card.appendChild(
            message
        );


        /*
         * Ucapan terbaru muncul
         * paling atas.
         */

        wishList.prepend(
            card
        );


        /*
         * Reset ucapan,
         * tetapi nama tetap.
         */

        document.getElementById(
            "ucapan"
        ).value = "";


        /*
         * Kirim juga ke Spreadsheet.
         *
         * Data RSVP dan ucapan
         * tetap berada di baris
         * yang berbeda jika user
         * mengirim ucapan setelah RSVP.
         *
         * Jika ingin satu baris
         * digabung berdasarkan nama,
         * Apps Script perlu dibuat
         * sedikit berbeda.
         */

        const data = {

            nama:
                wishNama,

            kehadiran:
                "Wedding Wishes",

            jumlah:
                "",

            ucapan:
                ucapan

        };


        fetch(
            SCRIPT_URL,
            {
                method: "POST",

                body:
                    JSON.stringify(
                        data
                    )
            }
        )
        .then(
            () => {

                console.log(
                    "Wedding wishes terkirim."
                );

            }
        )
        .catch(
            (error) => {

                console.error(
                    "Wedding wishes gagal dikirim:",
                    error
                );

            }
        );

    }
);


/* =========================================================
   BOTTOM NAV ACTIVE STATE
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".bottom-nav a"
    );


const navSections = [];


navLinks.forEach(
    (link) => {

        const target =
            link.getAttribute(
                "href"
            );

        const section =
            document.querySelector(
                target
            );

        if (section) {

            navSections.push({
                link:
                    link,

                section:
                    section
            });

        }

    }
);


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        navSections.forEach(
                            (item) => {

                                item.link.classList.toggle(
                                    "active",
                                    item.section ===
                                    entry.target
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


navSections.forEach(
    (item) => {

        navObserver.observe(
            item.section
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

getGuestName();


/*
 * Pastikan cover tetap menjadi
 * tampilan awal.
 */

if (mainContent) {

    mainContent.classList.remove(
        "main-visible"
    );

}
