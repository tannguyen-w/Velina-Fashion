document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo Swiper
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1, // Chuyển 1 slide mỗi lần

    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25,
        slidesPerGroup: 1,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4,
      },
    },

    // Navigation
    navigation: {
      nextEl: ".products__action-right",
      prevEl: ".products__action-left",
    },

    speed: 400,
    grabCursor: true,
    watchOverflow: true,

    // Callbacks
    on: {
      init: function () {
        updateNavigationState(this);
        updatePageCounter(this);
        showPageCounter(); // Hiển thị counter
      },

      slideChange: function () {
        updateNavigationState(this);
        updatePageCounter(this);
      },
    },
  });

  // Function để cập nhật trạng thái navigation buttons
  function updateNavigationState(swiper) {
    const prevBtn = document.querySelector(".products__action-left");
    const nextBtn = document.querySelector(".products__action-right");

    if (!prevBtn || !nextBtn) return;

    // Xử lý Previous button
    if (swiper.isBeginning) {
      prevBtn.classList.add("swiper-button-disabled");
      prevBtn.style.opacity = "0.3";
      prevBtn.style.cursor = "not-allowed";
      prevBtn.style.pointerEvents = "none";
      console.log("Previous button disabled");
    } else {
      prevBtn.classList.remove("swiper-button-disabled");
      prevBtn.style.opacity = "1";
      prevBtn.style.cursor = "pointer";
      prevBtn.style.pointerEvents = "auto";
    }

    // Xử lý Next button
    if (swiper.isEnd) {
      nextBtn.classList.add("swiper-button-disabled");
      nextBtn.style.opacity = "0.3";
      nextBtn.style.cursor = "not-allowed";
      nextBtn.style.pointerEvents = "none";
    } else {
      nextBtn.classList.remove("swiper-button-disabled");
      nextBtn.style.opacity = "1";
      nextBtn.style.cursor = "pointer";
      nextBtn.style.pointerEvents = "auto";
    }
  }

  // Function để cập nhật số trang
  function updatePageCounter(swiper) {
    const counterEl = document.querySelector(".products__action-number");
    if (!counterEl) return;

    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    const slidesPerView = Math.floor(swiper.params.slidesPerView);

    // Tính số trang thực tế
    const totalPages = Math.ceil(totalSlides / slidesPerView);
    const currentPage = Math.floor(currentIndex / slidesPerView) + 1;

    // Nhưng đảm bảo khi ở cuối thì hiển thị đúng
    let displayPage = currentPage;
    if (swiper.isEnd && slidesPerView < totalSlides) {
      displayPage = totalPages;
    }

    counterEl.textContent = `${displayPage}/${totalPages}`;
  }

  function showPageCounter() {
    const counterEl = document.querySelector(".products__action-number");
    if (counterEl) {
      counterEl.classList.remove("d-none");
    }
  }

  // Thêm event listeners thủ công để đảm bảo hoạt động
  const prevBtn = document.querySelector(".products__action-left");
  const nextBtn = document.querySelector(".products__action-right");

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      if (this.classList.contains("swiper-button-disabled")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      if (this.classList.contains("swiper-button-disabled")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && !swiper.isBeginning) {
      swiper.slidePrev();
    } else if (e.key === "ArrowRight" && !swiper.isEnd) {
      swiper.slideNext();
    }
  });

  // Touch/Mouse wheel support với kiểm tra disabled state
  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer) {
    swiperContainer.addEventListener("wheel", function (e) {
      e.preventDefault();

      if (e.deltaY > 0 && !swiper.isEnd) {
        // Scroll down - next slide
        swiper.slideNext();
      } else if (e.deltaY < 0 && !swiper.isBeginning) {
        // Scroll up - previous slide
        swiper.slidePrev();
      }
    });
  }

  // Expose swiper globally for debugging
  window.productsSwiper = swiper;

  document.querySelectorAll(".product-item__quick-add").forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.remove("btn--secondary");
      button.classList.add("product-item__quick-add--active");
      const loadingSpinner = this.querySelector(".product-item__quick-add--loading");
      if (loadingSpinner) {
        loadingSpinner.classList.remove("d-none");
      }
    });
  });
});
