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
