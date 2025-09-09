const container = document.querySelector(".container");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")

const images = [
    "./image/slider-img/slider-banner-1.webp",
    "./image/slider-img/slider-banner-2.webp",
    "./image/slider-img/slider-banner-3.webp",
];

let index = 0;

function changeSlide(i) {
    index = i;
    container.style.backgroundImage = `url('${images[i]}')`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[i].classList.add('active');
}

// Khi click dot
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => changeSlide(i))
})

// Khi click prev
prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    changeSlide(index)
})

// Khi click next
nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    changeSlide(index);
})


setInterval(() => {
    index = (index + 1) % images.length;
    changeSlide(index);
}, 3000);