document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các items
  const items = document.querySelectorAll(".collections-item");

  const collectionsContainer = document.querySelector(".collections");
  // Biến để lưu trữ item đang active
  let activeItem = items[0];
  // Mặc định active cho item đầu tiên
  if (activeItem) {
    activeItem.classList.add("active");
  }

  // Thêm event listeners cho mỗi item
  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Xóa active class khỏi item đang active trước đó
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      // Đặt item hiện tại làm active
      this.classList.add("active");
      // Cập nhật activeItem mới
      activeItem = this;
    });
  });

  if (collectionsContainer) {
    collectionsContainer.addEventListener("mouseleave", function () {});
  }
});
