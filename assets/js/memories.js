document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử memories__top
  const memoryTops = document.querySelectorAll(".memories__top");
  // Lấy tất cả các item
  const memoryItems = document.querySelectorAll(".memories__item");
  // Lấy tất cả các nội dung của item
  const memoryContents = document.querySelectorAll(".memories__item-content");

  // Lấy tất cả các hình ảnh
  const memoryImages = document.querySelectorAll(".memories__img");

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

      // Cập nhật active state
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

      // Hiển thị ảnh tương ứng KHÔNG có hiệu ứng fade - chỉ thay đổi trực tiếp class d-none
      memoryImages.forEach((img, i) => {
        if (i === index) {
          // Hiển thị ảnh tương ứng ngay lập tức
          img.classList.remove("d-none");
        } else {
          // Ẩn các ảnh khác ngay lập tức
          img.classList.add("d-none");
        }
      });
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

  // Các hàm fadeIn và fadeOut không còn cần thiết nên đã được loại bỏ
});
