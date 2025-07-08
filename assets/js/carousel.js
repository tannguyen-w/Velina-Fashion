function initInfiniteCarousel() {
  const carousel = document.getElementById("infiniteCarousel");
  const carouselContent = document.getElementById("carouselContent");

  if (!carousel || !carouselContent) return;

  // Sao chép nội dung để tạo vòng lặp liền mạch
  const originalContent = carouselContent.innerHTML;
  carouselContent.innerHTML = originalContent + originalContent + originalContent;

  // Tính toán chiều rộng
  const items = carouselContent.querySelectorAll(".carousel__item");
  let totalWidth = 0;
  items.forEach((item) => {
    totalWidth += item.offsetWidth;
  });
  const oneSetWidth = totalWidth / 3;

  // Biến theo dõi
  let currentPosition = 0;
  const speed = 1;
  let animationFrameId = null;
  let isRunning = false;

  // Hàm animation
  function animateCarousel() {
    currentPosition -= speed;
    if (Math.abs(currentPosition) >= oneSetWidth) {
      currentPosition = 0;
    }
    carouselContent.style.transform = `translateX(${currentPosition}px)`;
    animationFrameId = requestAnimationFrame(animateCarousel);
  }

  // Hàm bắt đầu animation
  function startCarousel() {
    if (!isRunning) {
      isRunning = true;
      animationFrameId = requestAnimationFrame(animateCarousel);
      console.log("Carousel animation started");
    }
  }

  // Hàm dừng animation
  function stopCarousel() {
    if (isRunning) {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        console.log("Carousel animation stopped");
      }
    }
  }

  // ----- PHẦN QUAN TRỌNG: THEO DÕI TẦM NHÌN -----

  // Sử dụng Intersection Observer để kiểm tra khi carousel trong tầm nhìn
  const observer = new IntersectionObserver(
    (entries) => {
      // Entries là mảng các phần tử được theo dõi đã thay đổi trạng thái
      entries.forEach((entry) => {
        // entry.isIntersecting = true khi phần tử đang hiển thị trong viewport
        if (entry.isIntersecting) {
          startCarousel();
        } else {
          stopCarousel();
        }
      });
    },
    {
      threshold: 0.1, // Kích hoạt khi ít nhất 10% carousel nằm trong viewport
      rootMargin: "0px", // Có thể điều chỉnh để kích hoạt sớm hơn, ví dụ: '100px'
    }
  );

  // Bắt đầu theo dõi carousel
  observer.observe(carousel);

  // Lưu observer vào carousel để dễ dàng dọn dẹp sau này
  carousel._observer = observer;
}

// Khởi tạo carousel
document.addEventListener("DOMContentLoaded", initInfiniteCarousel);
