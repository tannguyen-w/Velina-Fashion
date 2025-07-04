// Infinite Carousel
function initInfiniteCarousel() {
  const carousel = document.getElementById("infiniteCarousel");
  const carouselContent = document.getElementById("carouselContent");

  if (!carousel || !carouselContent) return;

  // Sao chép nội dung để tạo vòng lặp liền mạch
  const originalContent = carouselContent.innerHTML;
  carouselContent.innerHTML = originalContent + originalContent + originalContent;

  // Lấy tất cả các mục và tính tổng chiều rộng
  const items = carouselContent.querySelectorAll(".carousel__item");
  let totalWidth = 0;
  items.forEach((item) => {
    totalWidth += item.offsetWidth;
  });

  // Tính chiều rộng của một tập hợp (nội dung gốc)
  const oneSetWidth = totalWidth / 3;

  let currentPosition = 0;
  const speed = 1; // pixel trên mỗi khung hình (điều chỉnh tốc độ)

  function animateCarousel() {
    currentPosition -= speed;

    // Đặt lại vị trí khi một bộ hoàn chỉnh đã trôi qua
    if (Math.abs(currentPosition) >= oneSetWidth) {
      currentPosition = 0;
    }

    carouselContent.style.transform = `translateX(${currentPosition}px)`;
    requestAnimationFrame(animateCarousel);
  }

  // Start animation
  animateCarousel();
}

// Khởi tạo carousel khi mẫu được tải
window.addEventListener("template-loaded", initInfiniteCarousel);
// Cũng khởi tạo khi tải trang trong trường hợp mẫu đã được tải
document.addEventListener("DOMContentLoaded", initInfiniteCarousel);
