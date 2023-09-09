const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const r = document.querySelector(":root");

const maxIndex = 2;
const minIndex = 0;
let currentIndex = 1;

function getCurrentIndex() {
    let rs = getComputedStyle(r);
    return rs.getPropertyValue("--carouselIndex");
}

function setCurrentIndex(index) {
    r.style.setProperty("--carouselIndex", index);
}

prevButton.addEventListener("click", () => {
    currentIndex = getCurrentIndex();
    if (currentIndex <= minIndex) return;
    setCurrentIndex(--currentIndex);
    nextButton.disabled = false;
    if (currentIndex == minIndex) {
        prevButton.disabled = true;
    }
});

nextButton.addEventListener("click", () => {
    currentIndex = getCurrentIndex();
    if (currentIndex >= maxIndex) return;
    setCurrentIndex(++currentIndex);
    prevButton.disabled = false;
    if (currentIndex == maxIndex) {
        nextButton.disabled = true;
    }
})