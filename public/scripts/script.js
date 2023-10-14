// Close side navbar on link click
const sideNavBar = document.getElementById("sideNavBar");
const offcanvas = new bootstrap.Offcanvas(sideNavBar);
const offcanvasLinks = document.getElementsByClassName("offcanvas-link");

for (const link of offcanvasLinks) {
    link.addEventListener("click", () => {
        offcanvas.hide();
    });
}

// Carousel setup
const swiper = new Swiper(".carousel", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    navigation: {
        prevEl: ".prev-button",
        nextEl: ".next-button",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    }
});