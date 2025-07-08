document.addEventListener("DOMContentLoaded", function () {
  console.log("Video player script loaded");

  setTimeout(function () {
    initVideoPlayer();
  }, 200);

  function initVideoPlayer() {
    const videoOverlay = document.getElementById("videoOverlay");
    const videoPlayer = document.getElementById("videoPlayer");
    const closeButton = document.getElementById("closeButton");

    console.log("Video overlay:", videoOverlay);
    console.log("Video player:", videoPlayer);
    console.log("Close button:", closeButton);

    if (!videoOverlay || !videoPlayer || !closeButton) {
      console.error("Không tìm thấy các phần tử video player");
      return;
    }

    const video = videoPlayer.querySelector("video");

    if (!video) {
      console.error("Không tìm thấy thẻ video");
      return;
    }

    console.log("Video element:", video);

    // Khi bấm vào overlay để phát video
    videoOverlay.addEventListener("click", function () {
      console.log("Play button clicked");
      videoOverlay.style.display = "none";
      videoPlayer.style.display = "block";

      try {
        video.play().catch((error) => {
          console.error("Lỗi khi phát video:", error);
        });
      } catch (error) {
        console.error("Không thể phát video:", error);
      }
    });

    // Khi bấm nút đóng
    closeButton.addEventListener("click", function () {
      console.log("Close button clicked");
      videoPlayer.style.display = "none";
      videoOverlay.style.display = "flex";

      try {
        video.pause();
        video.currentTime = 0;
      } catch (error) {
        console.error("Không thể tạm dừng video:", error);
      }
    });

    console.log("Video player initialized");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo bộ đếm ngược từ local storage hoặc đặt mới
  initCountdown();

  // Cập nhật bộ đếm ngược mỗi giây
  setInterval(updateCountdown, 1000);
});

function initCountdown() {
  // Kiểm tra xem đã có thời gian kết thúc trong local storage chưa
  let endTime = localStorage.getItem("countdownEndTime");

  // Nếu chưa có hoặc đã hết hạn, tạo mới thời gian kết thúc (42 ngày từ hiện tại)
  if (!endTime || new Date(parseInt(endTime)) < new Date()) {
    const now = new Date();
    endTime = now.getTime() + 42 * 24 * 60 * 60 * 1000; // 42 ngày tính bằng milli giây
    localStorage.setItem("countdownEndTime", endTime);
  }

  // Cập nhật hiển thị ban đầu
  updateCountdown();
}

function updateCountdown() {
  // Lấy thời gian kết thúc từ local storage
  const endTime = parseInt(localStorage.getItem("countdownEndTime"));
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  // Nếu đã hết thời gian, reset lại
  if (timeLeft <= 0) {
    initCountdown();
    return;
  }

  // Tính toán ngày, giờ, phút, giây
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Cập nhật DOM
  document.querySelector(".countdown__days").textContent = days;
  document.querySelector(".countdown__hours").textContent = hours < 10 ? "0" + hours : hours;
  document.querySelector(".countdown__mins").textContent = minutes < 10 ? "0" + minutes : minutes;
  document.querySelector(".countdown__secs").textContent = seconds < 10 ? "0" + seconds : seconds;
}
