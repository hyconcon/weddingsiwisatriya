/* =====================================================
   CONFIGURATION
===================================================== */

// URL Google Apps Script Anda
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initGuestName();

    initInvitation();

    initMusic();

    initScrollReveal();

    initCoupleSlider();

    initCountdown();

    initWeddingWishes();

    initRSVP();

    initCopyAccount();

});


/* =====================================================
   GUEST NAME
   ?to=Nama%20Tamu
===================================================== */

function initGuestName(){

    const guestElement =
        document.getElementById("guest");

    if(!guestElement){
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guestName =
        params.get("to");

    if(guestName){

        guestElement.textContent =
            decodeURIComponent(guestName)
            .replace(/\+/g, " ");

    }

}


/* =====================================================
   OPEN INVITATION
===================================================== */

function initInvitation(){

    const button =
        document.getElementById(
            "openInvitation"
        );

    const cover =
        document.getElementById("cover");

    const mainContent =
        document.getElementById(
            "mainContent"
        );

    if(!button || !cover){
        return;
    }

    document.body.classList.add("locked");

    if(mainContent){
        mainContent.style.visibility =
            "hidden";
    }

    button.addEventListener("click", () => {

        cover.classList.add("hidden");

        document.body.classList.remove(
            "locked"
        );

        if(mainContent){

            mainContent.style.visibility =
                "visible";

        }

        playMusic();

        setTimeout(() => {

            const opening =
                document.getElementById(
                    "opening"
                );

            if(opening){

                opening.scrollIntoView({
                    behavior:"smooth"
                });

            }

        }, 500);

    });

}


/* =====================================================
   MUSIC
===================================================== */

let musicStarted = false;

function initMusic(){

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById(
            "musicButton"
        );

    if(!music){
        return;
    }

    if(musicButton){

        musicButton.addEventListener(
            "click",
            () => {

                if(music.paused){

                    music.play()
                        .then(() => {

                            musicButton
                                .classList
                                .add("playing");

                        })
                        .catch(() => {});

                }else{

                    music.pause();

                    musicButton
                        .classList
                        .remove("playing");

                }

            }
        );

    }

}

function playMusic(){

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById(
            "musicButton"
        );

    if(!music){
        return;
    }

    music.play()
        .then(() => {

            musicStarted = true;

            if(musicButton){

                musicButton
                    .classList
                    .add("playing");

            }

        })
        .catch(() => {

            // Browser dapat menolak autoplay.
            // Musik tetap dapat dimainkan
            // melalui tombol musik.

        });

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initScrollReveal(){

    const reveals =
        document.querySelectorAll(
            ".reveal"
        );

    if(!reveals.length){
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target
                            .classList
                            .add("active");

                    }

                });

            },
            {
                threshold:.12,
                rootMargin:"0px 0px -60px 0px"
            }
        );

    reveals.forEach(section => {

        observer.observe(section);

    });

}


/* =====================================================
   COUPLE SLIDER
===================================================== */

function initCoupleSlider(){

    const slides =
        document.querySelectorAll(
            ".couple-slide"
        );

    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );

    if(!slides.length){
        return;
    }

    let currentSlide = 0;

    function showSlide(index){

        slides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            }
        );

        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            }
        );

        currentSlide = index;

    }

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                }
            );

        }
    );

    setInterval(() => {

        currentSlide++;

        if(
            currentSlide >=
            slides.length
        ){

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 5000);

}


/* =====================================================
   COUNTDOWN
===================================================== */

function initCountdown(){

    const targetDate =
        new Date(
            "2026-12-28T10:00:00+07:00"
        ).getTime();


    function updateCountdown(){

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if(difference <= 0){

            if(days) days.textContent = "0";
            if(hours) hours.textContent = "0";
            if(minutes) minutes.textContent = "0";
            if(seconds) seconds.textContent = "0";

            return;

        }


        const dayValue =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hourValue =
            Math.floor(
                (difference /
                (1000 * 60 * 60)) %
                24
            );

        const minuteValue =
            Math.floor(
                (difference /
                (1000 * 60)) %
                60
            );

        const secondValue =
            Math.floor(
                (difference /
                1000) %
                60
            );


        if(days){
            days.textContent =
                dayValue;
        }

        if(hours){
            hours.textContent =
                String(hourValue)
                    .padStart(2,"0");
        }

        if(minutes){
            minutes.textContent =
                String(minuteValue)
                    .padStart(2,"0");
        }

        if(seconds){
            seconds.textContent =
                String(secondValue)
                    .padStart(2,"0");
        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


/* =====================================================
   WEDDING WISHES
===================================================== */

function initWeddingWishes(){

    const form =
        document.getElementById(
            "wishForm"
        );

    const nama =
        document.getElementById(
            "wishNama"
        );

    const ucapan =
        document.getElementById(
            "wishUcapan"
        );

    const charCount =
        document.getElementById(
            "charCount"
        );

    const wishList =
        document.getElementById(
            "wishList"
        );

    const wishCount =
        document.getElementById(
            "wishCount"
        );

    const status =
        document.getElementById(
            "wishStatus"
        );


    if(!form){
        return;
    }


    /* -----------------------------------------
       CHARACTER COUNTER
    ----------------------------------------- */

    if(ucapan && charCount){

        ucapan.addEventListener(
            "input",
            () => {

                charCount.textContent =
                    ucapan.value.length;

            }
        );

    }


    /* -----------------------------------------
       LOAD LOCAL WISHES
    ----------------------------------------- */

    let wishes = [];

    try{

        wishes =
            JSON.parse(
                localStorage.getItem(
                    "siwiSatriyaWishes"
                )
            ) || [];

    }catch(error){

        wishes = [];

    }


    function renderWishes(){

        if(!wishList){
            return;
        }

        wishList.innerHTML = "";


        if(!wishes.length){

            wishList.innerHTML = `
                <div class="wish-card">
                    <p>
                        Belum ada ucapan.
                        Jadilah yang pertama
                        memberikan ucapan dan doa.
                    </p>
                </div>
            `;

        }else{

            wishes.forEach(
                wish => {

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
                        wish.nama;


                    const message =
                        document.createElement(
                            "p"
                        );

                    message.textContent =
                        wish.ucapan;


                    card.appendChild(title);

                    card.appendChild(message);

                    wishList.appendChild(card);

                }
            );

        }


        if(wishCount){

            wishCount.textContent =
                wishes.length;

        }

    }


    renderWishes();


    /* -----------------------------------------
       SUBMIT WISH
    ----------------------------------------- */

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const namaValue =
                nama.value.trim();

            const ucapanValue =
                ucapan.value.trim();


            if(
                !namaValue ||
                !ucapanValue
            ){

                return;

            }


            const newWish = {

                nama:
                    namaValue,

                ucapan:
                    ucapanValue

            };


            /* Tampilkan langsung */

            wishes.unshift(
                newWish
            );


            localStorage.setItem(
                "siwiSatriyaWishes",
                JSON.stringify(wishes)
            );


            renderWishes();


            /* Kosongkan form */

            form.reset();

            if(charCount){

                charCount.textContent =
                    "0";

            }


            if(status){

                status.textContent =
                    "Ucapan berhasil ditambahkan ♥";

            }


            /* ---------------------------------
               SIMPAN KE GOOGLE SHEET
               --------------------------------- */

            try{

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:JSON.stringify({

                            nama:
                                namaValue,

                            kehadiran:
                                "Wedding Wishes",

                            jumlah:
                                0,

                            ucapan:
                                ucapanValue

                        })

                    }
                );

            }catch(error){

                console.log(
                    "Wedding wishes disimpan lokal."
                );

            }

            setTimeout(() => {

                if(status){

                    status.textContent =
                        "";

                }

            }, 3000);

        }
    );

}


/* =====================================================
   RSVP
===================================================== */

function initRSVP(){

    const form =
        document.getElementById(
            "rsvpForm"
        );

    if(!form){
        return;
    }


    const nama =
        document.getElementById(
            "nama"
        );

    const kehadiran =
        document.getElementById(
            "kehadiran"
        );

    const jumlah =
        document.getElementById(
            "jumlah"
        );

    const status =
        document.getElementById(
            "statusRsvp"
        );


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const namaValue =
                nama.value.trim();

            const kehadiranValue =
                kehadiran.value;

            const jumlahValue =
                Number(jumlah.value);


            if(
                !namaValue ||
                !kehadiranValue ||
                !jumlahValue
            ){

                if(status){

                    status.textContent =
                        "Mohon lengkapi data RSVP.";

                }

                return;

            }


            if(status){

                status.textContent =
                    "Mengirim RSVP...";
            }


            try{

                const response =
                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {
                            method:"POST",

                            headers:{
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify({

                                    nama:
                                        namaValue,

                                    kehadiran:
                                        kehadiranValue,

                                    jumlah:
                                        jumlahValue,

                                    ucapan:
                                        ""

                                })

                        }
                    );


                if(
                    response.ok
                ){

                    if(status){

                        status.textContent =
                            "RSVP berhasil dikirim. Terima kasih ♥";

                    }

                    form.reset();

                    jumlah.value = "1";

                }else{

                    throw new Error(
                        "Server error"
                    );

                }

            }catch(error){

                console.error(error);

                if(status){

                    status.textContent =
                        "RSVP gagal dikirim. Silakan coba lagi.";

                }

            }


            setTimeout(() => {

                if(status){

                    status.textContent =
                        "";

                }

            }, 5000);

        }
    );

}


/* =====================================================
   COPY BANK ACCOUNT
===================================================== */

function initCopyAccount(){

    const buttons =
        document.querySelectorAll(
            ".copy-account"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const account =
                    button.dataset.account;

                try{

                    await navigator.clipboard
                        .writeText(account);

                    const original =
                        button.textContent;

                    button.textContent =
                        "Berhasil Disalin ✓";


                    setTimeout(() => {

                        button.textContent =
                            original;

                    }, 2000);

                }catch(error){

                    alert(
                        "Nomor rekening: "
                        + account
                    );

                }

            }
        );

    });

}
