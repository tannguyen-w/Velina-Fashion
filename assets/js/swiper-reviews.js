document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo Swiper
  const reviewsSwiper = new Swiper(".reviews__list.swiper-reviews", {
    // Cấu hình slide
    slidesPerView: "auto",
    spaceBetween: 15,
    centeredSlides: false,
    slidesPerGroup: 3,

    // Hiển thị pagination (chấm tròn ở dưới)
    pagination: {
      el: ".reviews .swiper-pagination",
      clickable: true,
    },

    // Thiết lập các breakpoints cho responsive
    breakpoints: {
      // Khi chiều rộng cửa sổ >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },
      // Khi chiều rộng cửa sổ >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
      },
      // Khi chiều rộng cửa sổ >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
});
