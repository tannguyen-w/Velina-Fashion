document.addEventListener("DOMContentLoaded", function () {
  // ===== SIZE SELECTION =====
  const sizeButtons = document.querySelectorAll(".product-details__size--btn");
  const sizeName = document.querySelector(".product-details__size--name");

  sizeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Bỏ chọn nút hiện tại
      sizeButtons.forEach((btn) => btn.classList.remove("selected"));
      // Chọn nút được nhấp
      this.classList.add("selected");
      // Cập nhật tên size
      const selectedSize = this.textContent.trim();
      sizeName.textContent = `Size: ${selectedSize}`;
    });
  });

  // ===== COLOR SELECTION =====
  const colorItems = document.querySelectorAll(".product-details__color--item");
  const colorName = document.querySelector(".product-details__color--name");
  const mainImage = document.querySelector(".product-details-images__img");

  colorItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Bỏ chọn màu hiện tại
      colorItems.forEach((colorItem) => colorItem.classList.remove("active"));
      // Chọn màu được nhấp
      this.classList.add("active");

      // Cập nhật hình ảnh chính
      const colorImage = this.querySelector(".product-details__color--img");
      if (colorImage && mainImage) {
        mainImage.src = colorImage.src;
      }

      // Cập nhật tên màu (giả sử có thuộc tính data-color)
      // Nếu không có data-color, có thể sử dụng index để xác định màu
      const colorIndex = Array.from(colorItems).indexOf(this);
      const colors = ["green", "blue", "pink"]; // Thêm các màu theo thứ tự

      if (this.dataset.color) {
        colorName.textContent = `Color: ${this.dataset.color}`;
      } else if (colorIndex >= 0 && colorIndex < colors.length) {
        colorName.textContent = `Color: ${colors[colorIndex]}`;
      }
    });
  });

  // ===== QUANTITY ADJUSTMENT =====
  const quantityInput = document.querySelector(".product-details__action--num");
  const minusButton = document.querySelector(".product-details__action--minus").parentElement;
  const plusButton = document.querySelector(".product-details__action--plus").parentElement;

  // Xử lý nút giảm số lượng
  minusButton.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
    updateQuantity();
  });

  // Xử lý nút tăng số lượng
  plusButton.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.getAttribute("max")) || 9999;

    if (currentValue < maxValue) {
      quantityInput.value = currentValue + 1;
    }
    updateQuantity();
  });

  // Xử lý khi người dùng nhập trực tiếp
  quantityInput.addEventListener("change", function () {
    updateQuantity();
  });

  function updateQuantity() {
    let value = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.getAttribute("min")) || 1;
    const max = parseInt(quantityInput.getAttribute("max")) || 9999;

    // Đảm bảo giá trị trong phạm vi cho phép
    if (isNaN(value) || value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    quantityInput.value = value;
  }

  // ===== PRODUCT INFO ACCORDION =====
  // Lấy tất cả các phần tử product-details-info__item-top
  const infoTops = document.querySelectorAll(".product-details-info__item-top");
  // Lấy tất cả các item
  const infoItems = document.querySelectorAll(".product-details-info__item");
  // Lấy tất cả các nội dung của item
  const infoContents = document.querySelectorAll(".product-details-info__item--desc");

  // Ẩn tất cả nội dung ban đầu
  infoContents.forEach((content) => {
    content.style.display = "none";
  });

  // Xóa class active cho tất cả các item
  infoItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Xóa class active cho tất cả các top
  infoTops.forEach((top) => {
    top.classList.remove("active");
  });

  // Thêm sự kiện click cho mỗi product-details-info__item-top
  infoTops.forEach((top, index) => {
    top.addEventListener("click", function () {
      // Nếu item này đã active thì không làm gì cả
      if (infoItems[index].classList.contains("active")) return;

      // Cập nhật active state
      infoItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Hiển thị/ẩn nội dung với hiệu ứng trượt
      infoContents.forEach((content, i) => {
        if (i === index) {
          slideDown(content, 300);
        } else {
          slideUp(content, 300);
        }
      });
    });
  });

  // Hàm hiệu ứng trượt xuống
  function slideDown(element, duration) {
    element.style.display = "block";
    element.style.overflow = "hidden";
    element.style.height = "0px";
    element.style.opacity = "0";
    element.style.visibility = "visible";

    const targetHeight = element.scrollHeight;

    element.style.transition = `height ${duration}ms ease, opacity ${duration * 0.8}ms ease`;

    setTimeout(() => {
      element.style.height = targetHeight + "px";
      element.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      element.style.height = "auto";
    }, duration);
  }

  // Hàm hiệu ứng trượt lên
  function slideUp(element, duration) {
    element.style.overflow = "hidden";
    element.style.height = element.scrollHeight + "px";
    element.style.opacity = "1";

    setTimeout(() => {
      element.style.transition = `height ${duration}ms ease, opacity ${duration * 0.5}ms ease`;
      element.style.height = "0px";
      element.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      element.style.display = "none";
      element.style.visibility = "hidden";
    }, duration);
  }

  // ===== PRODUCT DETAILS IMAGES SLIDER =====
  const swiper = new Swiper(".product-details-images-swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Cập nhật số trang hiện tại
    on: {
      init: function () {
        updateCustomPagination(this);
      },
      slideChange: function () {
        updateCustomPagination(this);
      },
    },
  });

  const thumbnailsSwiper = document.querySelectorAll(".product-details-images__btn");
  const closeButton = document.querySelector(".product-details-images__modal--close");
  thumbnailsSwiper.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Cập nhật hình ảnh chính khi nhấp vào thumbnail
      const modal = document.querySelector(".product-details-images__modal");
      modal.classList.remove("d-none");
      closeButton.addEventListener("click", function () {
        // Ẩn modal khi nhấp vào nút đóng
        modal.classList.add("d-none");
      });
    });
  });

  // Hàm cập nhật hiển thị pagination
  function updateCustomPagination(swiper) {
    const currentSlide = document.querySelector(".swiper-pagination-current");
    const totalSlides = document.querySelector(".swiper-pagination-total");

    // +1 vì Swiper đánh số từ 0, nhưng hiển thị từ 1
    let realIndex = swiper.realIndex + 1;

    // Cập nhật số trang hiện tại
    if (currentSlide) {
      currentSlide.textContent = realIndex;
    }

    // Cập nhật tổng số trang (chỉ cần làm 1 lần)
    if (totalSlides && !totalSlides.textContent) {
      totalSlides.textContent = swiper.slides.length - 2; // Trừ 2 nếu sử dụng loop
      // Hoặc nếu không sử dụng loop: swiper.slides.length
    }
  }

  // ===== IMAGES SWIPER =====

  // Khai báo biến để lưu trữ instance của Swiper
  let productSwiper;

  // Hàm khởi tạo Swiper
  function initSwiper() {
    productSwiper = new Swiper(".imagesSwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // Hàm hủy Swiper
  function destroySwiper() {
    if (productSwiper !== undefined) {
      productSwiper.destroy(true, true);
      productSwiper = undefined;
    }
  }

  // Hàm kiểm tra và xử lý dựa trên kích thước màn hình
  function handleScreenSize() {
    const mobileView = window.matchMedia("(max-width: 539px)");

    if (mobileView.matches) {
      // Màn hình nhỏ hơn 540px - khởi tạo Swiper
      if (productSwiper === undefined) {
        // Thêm các class cần thiết cho Swiper
        const swiperContainer = document.querySelector(".imagesSwiper");
        if (!swiperContainer.classList.contains("swiper-initialized")) {
          // Thêm pagination và navigation nếu chưa có
          if (!document.querySelector(".imagesSwiper .swiper-pagination")) {
            const pagination = document.createElement("div");
            pagination.className = "swiper-pagination";
            swiperContainer.appendChild(pagination);
          }

          initSwiper();
        }
      }
    } else {
      // Màn hình lớn hơn hoặc bằng 540px - hủy Swiper
      destroySwiper();

      // Xóa các class của Swiper nếu cần
      const swiperContainer = document.querySelector(".imagesSwiper");
      if (swiperContainer.classList.contains("swiper-initialized")) {
        swiperContainer.classList.remove("swiper-initialized", "swiper-backface-hidden");
      }
    }
  }

  // Kiểm tra kích thước màn hình khi trang được tải
  handleScreenSize();

  // Theo dõi sự thay đổi kích thước màn hình
  window.addEventListener("resize", handleScreenSize);
});
