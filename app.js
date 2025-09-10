// Load header
fetch("/components/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

// Load footer
fetch("/components/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);


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

const productList = document.querySelector(".product-list");
const productPrev = document.querySelector(".product-slider-prev");
const productNext = document.querySelector(".product-slider-next");

let productIndex = 0;
const visibleProducts = 6; // Số sản phẩm hiển thị cùng lúc
const totalItems = document.querySelectorAll(".product-card").length;

productNext.addEventListener('click', () => {
    if (productIndex < totalItems - visibleProducts) {
        productIndex += visibleProducts;
    } else {
        // Nếu đang ở cuối thì quay lại đầu
        productIndex = 0;
    }
    updateProductSlide();
});

productPrev.addEventListener('click', () => {
    if (productIndex > 0) {
        productIndex -= visibleProducts;
    } else {
        // Nếu đang ở đầu thì quay về cuối
        productIndex = totalItems - visibleProducts;
    }
    updateProductSlide();
});

function updateProductSlide() {
    const cardWidth = document.querySelector(".product-card").offsetWidth;
    productList.style.transition = "transform 0.5s ease"; // hiệu ứng mượt
    productList.style.transform = `translateX(-${productIndex * cardWidth}px)`;
}