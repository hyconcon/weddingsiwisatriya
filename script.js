/* =====================================================
   WEDDING INVITATION
   SIWI & SATRIYA
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       ELEMENTS
    ================================================= */

    const cover =
        document.getElementById("cover");

    const mainContent =
        document.getElementById("mainContent");

    const openInvitation =
        document.getElementById("openInvitation");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const bottomNav =
        document.getElementById("bottomNav");

    const guest =
        document.getElementById("guest");


    /* =================================================
       GOOGLE APPS SCRIPT
       RSVP
    ================================================= */

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";


    /* =================================================
       GUEST NAME
       URL:
       ?to=Nama%20Tamu
    ================================================= */

    const params =
        new URLSearchParams(window.location.search);

    const guestName =
        params.get("to");


    if (guestName && guest) {

        const decodedName =
            guestName.replace(/\+/g, " ");

        guest.textContent =
            decodedName;

    }


    /* =================================================
       INITIAL STATE
    ================================================= */

    mainContent.classList.add("hidden");

    bottomNav.classList.add("hidden");

    musicButton.classList.add("hidden");

    document.body.classList.remove("invitation-open");


    /* =================================================
       OPEN INVITATION
    ================================================= */

    openInvitation.addEventListener(
        "click",
        function () {

            /*
             * Tampilkan main content
             */

            mainContent.classList.remove("hidden");

            mainContent.classList.add("show");


            /*
             * Cover menghilang
             */

            cover.style.transition =
                "opacity .8s ease, visibility .8s ease";

            cover.style.opacity = "0";

            cover.style.visibility = "hidden";


            setTimeout(function () {

                cover.style.display = "none";

            }, 850);


            /*
             * Body sudah membuka undangan
             */

            document.body.classList.add(
                "invitation-open"
            );


            /*
             * Bottom navigation muncul
             */

            bottomNav.classList.remove("hidden");


            /*
             * Music button muncul
             */

            musicButton.classList.remove("hidden");


            /*
             * Putar musik
             */

            if (music) {

                music.volume = 0.5;

                const playPromise =
                    music.play();

                if (
                    playPromise !== undefined
                ) {

                    playPromise
                        .then(function () {

                            musicButton.classList.add(
                                "playing"
                            );

                        })
                        .catch(function () {

                            console.log(
                                "Browser memblokir autoplay."
                            );

                        });

                }

            }


            /*
             * Tampilkan opening
             */

            setTimeout(function () {

                const opening =
                    document.getElementById(
                        "opening"
                    );

                if (opening) {

                    opening.classList.add(
                        "visible"
                    );

                }

            }, 200);


            /*
             * Mulai observer fade-in
             */

            startFadeObserver();

        }
    );


    /* =================================================
       FADE IN OBSERVER
    ================================================= */

    function startFadeObserver() {

        const sections =
            document.querySelectorAll(
                ".fade-section"
            );


        /*
         * Kalau browser tidak mendukung
         * IntersectionObserver
         */

        if (!("IntersectionObserver" in window)) {

            sections.forEach(function (section) {

                section.classList.add(
                    "visible"
                );

            });

            return;

        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
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


        sections.forEach(function (section) {

            observer.observe(section);

        });

    }


    /* =================================================
       MUSIC BUTTON
    ================================================= */

    musicButton.addEventListener(
        "click",
        function () {

            if (!music) {
                return;
            }


            if (music.paused) {

                music.play()
                    .then(function () {

                        musicButton.classList.add(
                            "playing"
                        );

                    })
                    .catch(function (error) {

                        console.log(error);

                    });

            } else {

                music.pause();

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );


    /* =================================================
       COUNTDOWN
    ================================================= */

    const weddingDate =
        new Date(
            "December 28, 2026 10:00:00"
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );


        const daysEl =
            document.getElementById("days");

        const hoursEl =
            document.getElementById("hours");

        const minutesEl =
            document.getElementById("minutes");

        const secondsEl =
            document.getElementById("seconds");


        if (distance <= 0) {

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            return;

        }


        daysEl.textContent =
            String(days).padStart(2, "0");

        hoursEl.textContent =
            String(hours).padStart(2, "0");

        minutesEl.textContent =
            String(minutes).padStart(2, "0");

        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =================================================
       RSVP
    ================================================= */

    const rsvpForm =
        document.getElementById(
            "rsvpForm"
        );

    const statusRsvp =
        document.getElementById(
            "statusRsvp"
        );


    rsvpForm.addEventListener(
        "submit",
        async function (event) {

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


            if (!nama || !kehadiran) {

                statusRsvp.textContent =
                    "Mohon lengkapi data RSVP.";

                return;

            }


            const submitButton =
                rsvpForm.querySelector(
                    "button[type='submit']"
                );


            submitButton.disabled =
                true;

            submitButton.textContent =
                "Mengirim...";

            statusRsvp.textContent =
                "";


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

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


                statusRsvp.textContent =
                    "Terima kasih, konfirmasi Anda sudah dikirim. 🤍";


                rsvpForm.reset();


                document.getElementById(
                    "jumlah"
                ).value = 1;


            } catch (error) {

                console.error(error);

                statusRsvp.textContent =
                    "Terjadi kendala saat mengirim RSVP. Silakan coba lagi.";

            }


            submitButton.disabled =
                false;

            submitButton.textContent =
                "Kirim RSVP";

        }
    );


    /* =================================================
       WEDDING WISHES
       Ditampilkan langsung setelah dikirim
    ================================================= */

    const wishForm =
        document.getElementById(
            "wishForm"
        );

    const wishList =
        document.getElementById(
            "wishList"
        );

    const wishStatus =
        document.getElementById(
            "wishStatus"
        );


    wishForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nama =
                document.getElementById(
                    "wishNama"
                ).value.trim();

            const ucapan =
                document.getElementById(
                    "ucapan"
                ).value.trim();


            if (!nama || !ucapan) {

                wishStatus.textContent =
                    "Mohon isi nama dan ucapan terlebih dahulu.";

                return;

            }


            /*
             * Buat card baru
             */

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "wish-card";


            const title =
                document.createElement(
                    "h4"
                );

            title.textContent =
                nama;


            const text =
                document.createElement(
                    "p"
                );

            text.textContent =
                ucapan;


            card.appendChild(title);

            card.appendChild(text);


            /*
             * Masukkan paling atas
             */

            wishList.prepend(card);


            /*
             * Bersihkan form
             */

            wishForm.reset();


            wishStatus.textContent =
                "Terima kasih atas ucapan dan doanya. 🤍";


            /*
             * Scroll sedikit ke wishes
             */

            setTimeout(function () {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);


            /*
             * Hapus status setelah beberapa detik
             */

            setTimeout(function () {

                wishStatus.textContent =
                    "";

            }, 4000);

        }
    );


    /* =================================================
       COPY REKENING
    ================================================= */

    const copyButtons =
        document.querySelectorAll(
            ".copy-account"
        );


    copyButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const account =
                        button.dataset.account;


                    try {

                        await navigator.clipboard.writeText(
                            account
                        );

                        const originalText =
                            button.textContent;

                        button.textContent =
                            "Berhasil Disalin ✓";


                        setTimeout(
                            function () {

                                button.textContent =
                                    originalText;

                            },
                            1800
                        );

                    } catch (error) {

                        /*
                         * Fallback browser lama
                         */

                        const temp =
                            document.createElement(
                                "textarea"
                            );

                        temp.value =
                            account;

                        document.body.appendChild(
                            temp
                        );

                        temp.select();

                        document.execCommand(
                            "copy"
                        );

                        document.body.removeChild(
                            temp
                        );

                        button.textContent =
                            "Berhasil Disalin ✓";

                    }

                }
            );

        }
    );


    /* =================================================
       BOTTOM NAV ACTIVE STATE
    ================================================= */

    const navLinks =
        document.querySelectorAll(
            ".bottom-nav a"
        );


    const navSections =
        document.querySelectorAll(
            "#opening, #couple, #story, #gallery, #rsvp"
        );


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                navLinks.forEach(
                                    function (link) {

                                        link.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                const activeLink =
                                    document.querySelector(
                                        '.bottom-nav a[href="#' +
                                        entry.target.id +
                                        '"]'
                                    );


                                if (activeLink) {

                                    activeLink.classList.add(
                                        "active"
                                    );

                                }

                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        navSections.forEach(
            function (section) {

                navObserver.observe(
                    section
                );

            }
        );

    }


});
