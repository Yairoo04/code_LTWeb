// Load header
fetch("/components/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

// Load footer
fetch("/components/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);


const container = document.querySelector(".container");
  // Load showroom menu
document.addEventListener("DOMContentLoaded", () => {
  fetch("/page/components/menu-list-showroom.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("menu-list-showroom").innerHTML = data;

      // Auto active menu
      const currentPath = window.location.pathname;
      document.querySelectorAll("#menu-list-showroom li a").forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (currentPath === linkPath) {
          link.parentElement.classList.add("active");
        }
      });
    })
    .catch(err => console.error("Lỗi load menu:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".choice-box-bao-hanh .choice-box");
  const contents = document.querySelectorAll(".choice-content .content-box");

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      // reset active cho các box
      boxes.forEach(b => b.classList.remove("active"));
      // bật active cho box click
      box.classList.add("active");

      // reset nội dung
      contents.forEach(c => c.classList.remove("active"));
      // hiện đúng nội dung
      const targetId = box.dataset.target;
      document.getElementById(targetId).classList.add("active");
    });
  });
});

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
