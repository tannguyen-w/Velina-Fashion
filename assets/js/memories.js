document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử memories__top
  const memoryTops = document.querySelectorAll(".memories__top");
  // Lấy tất cả các item
  const memoryItems = document.querySelectorAll(".memories__item");
  // Lấy tất cả các nội dung của item
  const memoryContents = document.querySelectorAll(".memories__item-content");

  // Lấy tất cả các hình ảnh
  const memoryImages = document.querySelectorAll(".memories__img");

  // Thêm class active cho ảnh đầu tiên
  if (memoryImages.length > 0) {
    memoryImages[0].classList.add("active");
  }

  // Ẩn tất cả nội dung trừ item đầu tiên
  memoryContents.forEach((content, index) => {
    if (index !== 0) {
      content.style.display = "none";
    }
  });

  // Thêm sự kiện click cho mỗi memories__top
  memoryTops.forEach((top, index) => {
    top.addEventListener("click", function () {
      // Nếu item này đã active thì không làm gì cả
      if (memoryItems[index].classList.contains("active")) return;

      // Cập nhật active state cho các tab
      memoryItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Hiển thị/ẩn nội dung với hiệu ứng trượt
      memoryContents.forEach((content, i) => {
        if (i === index) {
          slideDown(content, 300);
        } else {
          slideUp(content, 300);
        }
      });

      // Hiển thị ảnh tương ứng với hiệu ứng mượt mà
      showMemoryImage(index);
    });
  });

  // Hàm hiệu ứng trượt xuống
  function slideDown(element, duration) {
    element.style.display = "block";
    element.style.overflow = "hidden";
    element.style.height = "0px";

    const targetHeight = element.scrollHeight;

    element.style.transition = `height ${duration}ms ease`;
    setTimeout(() => {
      element.style.height = targetHeight + "px";
    }, 10);

    setTimeout(() => {
      element.style.height = "auto";
    }, duration);
  }

  // Hàm hiệu ứng trượt lên
  function slideUp(element, duration) {
    element.style.overflow = "hidden";
    element.style.height = element.scrollHeight + "px";

    setTimeout(() => {
      element.style.transition = `height ${duration}ms ease`;
      element.style.height = "0px";
    }, 10);

    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  }

  // Hàm hiển thị ảnh mới với hiệu ứng mượt mà
  function showMemoryImage(newIndex) {
    // Tìm ảnh đang active hiện tại
    const currentActiveIndex = Array.from(memoryImages).findIndex((img) => img.classList.contains("active"));

    // Nếu đang hiển thị ảnh này rồi thì không làm gì
    if (currentActiveIndex === newIndex) return;

    // Đánh dấu ảnh hiện tại là đang chuyển đổi
    // để giữ z-index trong quá trình transition ra
    if (currentActiveIndex >= 0) {
      memoryImages[currentActiveIndex].classList.add("transitioning");
    }

    // Loại bỏ class inactive trên ảnh cần hiển thị
    memoryImages[newIndex].classList.remove("inactive");

    // Đảm bảo việc thay đổi CSS được render trước khi thêm class active
    requestAnimationFrame(() => {
      // Thêm active cho ảnh mới
      memoryImages[newIndex].classList.add("active");

      // Loại bỏ active từ ảnh cũ
      if (currentActiveIndex >= 0) {
        memoryImages[currentActiveIndex].classList.remove("active");
      }

      // Sau khi transition kết thúc
      const handleTransitionEnd = () => {
        // Loại bỏ class transitioning
        memoryImages.forEach((img, i) => {
          if (i !== newIndex) {
            img.classList.remove("transitioning");
            img.classList.add("inactive");
          }
        });

        // Loại bỏ event listener
        memoryImages[newIndex].removeEventListener("transitionend", handleTransitionEnd);
      };

      // Lắng nghe sự kiện transition kết thúc
      memoryImages[newIndex].addEventListener("transitionend", handleTransitionEnd, { once: true });
    });
  }
});
