// =========================
// VIDEO POPUP
// =========================

const videoModal = document.getElementById("videoModal");
const popupVideo = document.getElementById("popupVideo");
const closeVideo = document.getElementById("closeVideo");

const videoSources = [
    "videos/cinematic.mp4",
    "videos/reel.mp4",
    "videos/youtube.mp4",
    "videos/motion.mp4"
];

const videoBoxes = document.querySelectorAll(".video-box");

videoBoxes.forEach((box, index) => {

    box.addEventListener("click", function(event) {

        // Don't open popup when clicking
        // the video's own controls
        if (event.target.tagName === "VIDEO") {
            return;
        }

        popupVideo.src = videoSources[index];

        videoModal.classList.add("active");

        popupVideo.play();

    });

});


// CLOSE BUTTON

closeVideo.addEventListener("click", function() {

    popupVideo.pause();

    popupVideo.src = "";

    videoModal.classList.remove("active");

});


// CLICK OUTSIDE VIDEO

videoModal.addEventListener("click", function(event) {

    if (event.target === videoModal) {

        popupVideo.pause();

        popupVideo.src = "";

        videoModal.classList.remove("active");

    }

});


// ESC KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        popupVideo.pause();

        popupVideo.src = "";

        videoModal.classList.remove("active");

    }

});

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// =========================
// PORTFOLIO FILTER
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".video-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Change active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Filter cards
        portfolioCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});

// =========================
// HOVER VIDEO PREVIEW
// =========================

const previewVideos = document.querySelectorAll(".video-card video");

previewVideos.forEach(video => {

    const card = video.closest(".video-card");

    card.addEventListener("mouseenter", () => {

        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Browser may block autoplay.
            });
        }

    });


    card.addEventListener("mouseleave", () => {

        video.pause();
        video.currentTime = 0;

    });

});

// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


// Close menu when a link is clicked

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});
// ===== SCROLL PROGRESS =====

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    scrollProgress.style.width = progress + "%";
});
// ===== CUSTOM CURSOR =====

const customCursor = document.getElementById("customCursor");

if (customCursor && window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", (event) => {
        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";
    });

    const cursorTargets = document.querySelectorAll(
        "a, button, .video-card, summary"
    );

    cursorTargets.forEach(target => {

        target.addEventListener("mouseenter", () => {
            customCursor.classList.add("active");
        });

        target.addEventListener("mouseleave", () => {
            customCursor.classList.remove("active");
        });

    });
}
/* =========================
   PAGE LOADER
========================= */

const pageLoader = document.getElementById("pageLoader");

if (pageLoader) {
    setTimeout(function () {
        pageLoader.classList.add("loaded");
    }, 1500);
}
// ===== BACK TO TOP =====

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ===== PROJECT INQUIRY FORM =====

const projectForm = document.getElementById("projectForm");

if (projectForm) {

    projectForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("clientName").value.trim();
        const project = document.getElementById("projectType").value;
        const budget = document.getElementById("budget").value;
        const deadline = document.getElementById("deadline").value.trim();
        const details = document.getElementById("projectMessage").value.trim();

        const newMessage = {
            name: name,
            email: "Not provided",
            project: project,
            budget: budget,
            deadline: deadline || "Not specified",
            message: details,
            date: new Date().toLocaleString()
        };

        const messages = JSON.parse(
            localStorage.getItem("clientMessages") || "[]"
        );

        messages.push(newMessage);

        localStorage.setItem(
            "clientMessages",
            JSON.stringify(messages)
        );

        alert("Request submitted successfully!");

        projectForm.reset();

    });

}
/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .video-card, .service, .price-card, .testimonial-card, .faq-item, .stat-item, .about-content, .about-image, .inquiry-form, .final-cta, .why-card, .showcase-card, .process-card, .featured-reel-box"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal", "active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* =========================
   VIDEO FULLSCREEN
========================= */

const fullscreenVideo = document.getElementById("fullscreenVideo");

if (fullscreenVideo && popupVideo) {

    fullscreenVideo.addEventListener("click", async () => {

        try {

            if (popupVideo.requestFullscreen) {
                await popupVideo.requestFullscreen();
            } 
            else if (popupVideo.webkitRequestFullscreen) {
                popupVideo.webkitRequestFullscreen();
            }

        } catch (error) {
            console.log("Fullscreen not available.");
        }

    });

}
/* =========================
   SHOWCASE FILTER
========================= */

const showcaseFilters =
    document.querySelectorAll(".showcase-filter");

const showcaseCards =
    document.querySelectorAll(".showcase-card");

showcaseFilters.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.showcaseFilter;

        showcaseFilters.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        showcaseCards.forEach((card) => {

            const category =
                card.dataset.showcaseCategory;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                card.classList.remove("showcase-hidden");
            } else {
                card.classList.add("showcase-hidden");
            }

        });

    });

});
/* HERO TYPING ANIMATION */

const typingText = document.getElementById("typingText");

if (typingText) {
    const words = [
        "STORIES.",
        "EXPERIENCES.",
        "CONTENT.",
        "MOMENTS."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }
        } else {
            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 70 : 110);
    }

    typeEffect();
}
/* NAVBAR SCROLL EFFECT */

const nav = document.querySelector(".nav");

if (nav) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
}
/* ANIMATED STATS COUNTER */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const suffix = counter.dataset.suffix || "";

            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const current = Math.floor(progress * target);

                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    },
    {
        threshold: 0.5
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});
/* COPY WHATSAPP NUMBER */

const copyWhatsApp = document.getElementById("copyWhatsApp");
const copyMessage = document.getElementById("copyMessage");

if (copyWhatsApp && copyMessage) {
    copyWhatsApp.addEventListener("click", function () {
        navigator.clipboard.writeText("8469005206");

        copyMessage.textContent = "NUMBER COPIED ✓";

        setTimeout(function () {
            copyMessage.textContent = "";
        }, 2000);
    });
}