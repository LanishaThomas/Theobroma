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


/* store last visited section */
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function () {
        const id = this.getAttribute("href");
        if (id && id.length > 1) {
            localStorage.setItem("lastSection", id);
        }
    });
});

/* restore scroll on reload */
window.addEventListener("load", () => {
    const last = localStorage.getItem("lastSection");
    if (last) {
        const el = document.querySelector(last);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth" });
            }, 200);
        }
    }
});

/* visit counter */
let visits = localStorage.getItem("visitCount");
visits = visits ? parseInt(visits) + 1 : 1;
localStorage.setItem("visitCount", visits);

/* create floating badge — no HTML edit needed */
const badge = document.createElement("div");
badge.textContent = `Visits: ${visits}`;
badge.style.position = "fixed";
badge.style.bottom = "12px";
badge.style.right = "12px";
badge.style.background = "#000";
badge.style.color = "#fff";
badge.style.padding = "6px 10px";
badge.style.borderRadius = "8px";
badge.style.fontSize = "12px";
badge.style.zIndex = "20000";

document.body.appendChild(badge);

const emailInput = document.getElementById("gmail");
const signupBtn = emailInput.parentNode.querySelector("a");

function shakeInput() {
    emailInput.classList.remove("input-shake");
    void emailInput.offsetWidth;
    emailInput.classList.add("input-shake");
}

/* clear custom error when user types */
emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
});

signupBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    /* ALWAYS clear first */
    emailInput.setCustomValidity("");

    /* empty check */
    if (email === "") {
        emailInput.setCustomValidity("Enter email");
        emailInput.reportValidity();
        shakeInput();
        return;
    }

    /* format check */
    if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        shakeInput();
        return;
    }

    /* valid → success */
    localStorage.setItem("subscriberEmail", email);

    const label = document.querySelector("label[for='gmail']");
    if (label) label.style.display = "none";
    signupBtn.style.display = "none";

    const msg = document.createElement("div");
    msg.textContent = "Thank you for subscribing!";
    msg.style.fontWeight = "600";
    msg.style.padding = "10px 0";

    emailInput.replaceWith(msg);
});
