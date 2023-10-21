class LandingPage {
    constructor() {
        this.sideNavBar = document.getElementById("sideNavBar");
        this.offcanvas = new bootstrap.Offcanvas(sideNavBar);
        this.offcanvasLinks = document.getElementsByClassName("offcanvas-link");
    }

    init() {
        // Close side navbar on link click
        for (const link of this.offcanvasLinks) {
            link.addEventListener("click", () => {
                this.offcanvas.hide();
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
    }
}

const landingPage = new LandingPage();

landingPage.init();

