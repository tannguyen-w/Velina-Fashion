document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử cần thiết
  const faqTops = document.querySelectorAll(".faq__top");
  const faqItems = document.querySelectorAll(".faq__item");
  const faqContents = document.querySelectorAll(".faq__content");
  const faqSection = document.querySelector(".faq") || faqItems[0].parentElement;

  // Thiết lập trạng thái ban đầu - chỉ hiển thị item đầu tiên
  faqItems[0].classList.add("active");
  faqContents.forEach((content, index) => {
    if (index !== 0) {
      content.style.display = "none";
      content.style.height = "0px";
    } else {
      content.style.display = "block";
      content.style.height = "auto";
    }
  });

  // Thêm sự kiện click cho mỗi faq__top
  faqTops.forEach((top, index) => {
    top.addEventListener("click", function (e) {
      e.preventDefault();

      // Nếu item này đã active thì không làm gì cả
      if (faqItems[index].classList.contains("active")) return;

      // Lưu lại chiều cao hiện tại của section trước khi thay đổi
      const currentSectionHeight = faqSection.offsetHeight;
      faqSection.style.height = currentSectionHeight + "px";

      // Cập nhật active state
      faqItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Hiển thị/ẩn nội dung với hiệu ứng trượt mượt mà
      faqContents.forEach((content, i) => {
        if (i === index) {
          // Tính toán chiều cao của nội dung mới trước khi hiển thị
          content.style.display = "block";
          content.style.visibility = "hidden";
          const contentHeight = content.scrollHeight;
          content.style.display = "none";
          content.style.visibility = "visible";

          slideDown(content, 300, function () {
            // Cho phép section thích nghi với chiều cao mới sau khi transition hoàn tất
            setTimeout(() => {
              faqSection.style.height = "auto";
            }, 50);
          });
        } else if (content.style.display !== "none") {
          slideUp(content, 300);
        }
      });
    });
  });

  // Hàm hiệu ứng trượt xuống được cải tiến
  function slideDown(element, duration, callback) {
    element.style.display = "block";
    element.style.overflow = "hidden";
    element.style.opacity = "0";
    element.style.height = "0px";
    element.style.paddingTop = "0";
    element.style.paddingBottom = "0";
    element.style.marginTop = "0";
    element.style.marginBottom = "0";

    const targetHeight = element.scrollHeight;

    // Sử dụng requestAnimationFrame để đảm bảo animation mượt mà
    requestAnimationFrame(() => {
      element.style.transition = `height ${duration}ms ease, 
                                opacity ${duration * 0.8}ms ease,
                                padding ${duration * 0.8}ms ease,
                                margin ${duration * 0.8}ms ease`;
      element.style.opacity = "1";
      element.style.height = targetHeight + "px";
      element.style.paddingTop = "";
      element.style.paddingBottom = "";
      element.style.marginTop = "";
      element.style.marginBottom = "";
    });

    setTimeout(() => {
      element.style.height = "auto";
      element.style.overflow = "";
      element.style.transition = "";
      if (callback) callback();
    }, duration);
  }

  // Hàm hiệu ứng trượt lên được cải tiến
  function slideUp(element, duration, callback) {
    // Đặt chiều cao cố định trước khi animation
    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";
    element.style.opacity = "1";

    // Force browser reflow để đảm bảo chiều cao được áp dụng
    element.getBoundingClientRect();

    // Thiết lập transition
    element.style.transition = `height ${duration}ms ease, 
                              opacity ${duration * 0.5}ms ease,
                              padding ${duration * 0.5}ms ease,
                              margin ${duration * 0.5}ms ease`;

    // Thực hiện animation
    requestAnimationFrame(() => {
      element.style.height = "0px";
      element.style.opacity = "0";
      element.style.paddingTop = "0";
      element.style.paddingBottom = "0";
      element.style.marginTop = "0";
      element.style.marginBottom = "0";
    });

    // Ẩn phần tử sau khi animation hoàn tất
    setTimeout(() => {
      element.style.display = "none";
      element.style.height = "";
      element.style.overflow = "";
      element.style.transition = "";
      element.style.opacity = "";
      element.style.paddingTop = "";
      element.style.paddingBottom = "";
      element.style.marginTop = "";
      element.style.marginBottom = "";
      if (callback) callback();
    }, duration);
  }
});
