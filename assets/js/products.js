// Import core Swiper
import Swiper from "swiper";
// Import required modules
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Khởi tạo Swiper với modules
const swiper = new Swiper(".mySwiper", {
  // Configure Swiper to use modules
  modules: [Navigation, Pagination, Scrollbar],

  slidesPerView: 1,
  spaceBetween: 20,

  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },

  navigation: {
    nextEl: ".products__action-right",
    prevEl: ".products__action-left",
  },

  loop: false,
  speed: 400,
  grabCursor: true,
});
