document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử faq__top
  const faqTops = document.querySelectorAll(".faq__top");
  // Lấy tất cả các item
  const faqItems = document.querySelectorAll(".faq__item");
  // Lấy tất cả các nội dung của item
  const faqContents = document.querySelectorAll(".faq__content");

  // Ẩn tất cả nội dung trừ item đầu tiên
  faqContents.forEach((content, index) => {
    if (index !== 0) {
      content.style.display = "none";
    }
  });

  // Thêm sự kiện click cho mỗi faq__top
  faqTops.forEach((top, index) => {
    top.addEventListener("click", function () {
      // Nếu item này đã active thì không làm gì cả
      if (faqItems[index].classList.contains("active")) return;

      // Cập nhật active state
      faqItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Hiển thị/ẩn nội dung với hiệu ứng trượt
      faqContents.forEach((content, i) => {
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
});
