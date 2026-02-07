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

/* move sidebar to body ONLY on mobile */
function placeNavLinks() {
    if (window.innerWidth <= 768) {
        if (navLinks.parentNode !== document.body) {
            document.body.appendChild(navLinks);
        }
    } else {
        const nav = document.getElementById("nav");
        if (navLinks.parentNode !== nav) {
            nav.appendChild(navLinks);
        }
    }
}

placeNavLinks();
window.addEventListener("resize", placeNavLinks);


/* create overlay dynamically */
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

navLinks.addEventListener("click", e => e.stopPropagation());
overlay.addEventListener("click", closeMenu);
document.addEventListener("click", closeMenu);


/* smooth scroll */
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
        closeMenu();
    });
});
