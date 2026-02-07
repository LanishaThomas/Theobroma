document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("sliderTrack");
    const slides = track.children;
    let index = 0;

    setInterval(function () {
        index = (index + 1) % slides.length;
        track.style.transform = "translateX(-" + (index * 100) + "%)";
    }, 2000); // 2 seconds
});


document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("testimonialTrack");
    const total = track.children.length;
    let index = 0;

    setInterval(function () {
        index = (index + 1) % total;
        track.style.transform =
            "translateX(-" + (index * (100 / total)) + "%)";
    }, 3000); // change testimonial every 3 seconds
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

/* move sidebar to body to escape stacking traps */
document.body.appendChild(navLinks);
/* create overlay dynamically — no HTML edit needed */
const overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

/* helpers */
function openMenu() {
    navLinks.classList.add("show");
    overlay.classList.add("show");
}

function closeMenu() {
    navLinks.classList.remove("show");
    overlay.classList.remove("show");
}

/* toggle */
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.contains("show") ? closeMenu() : openMenu();
});

/* keep clicks inside menu from closing */
navLinks.addEventListener("click", e => e.stopPropagation());

/* overlay click closes */
overlay.addEventListener("click", closeMenu);

/* click anywhere else closes */
document.addEventListener("click", closeMenu);

/* smooth scroll + close */
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
        closeMenu();
    });
});
