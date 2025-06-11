import AOS from "aos";
import "aos/dist/aos.css";

const ScrollAnimation = () => {
  AOS.init({
    duration: 1000,     // Duration of Animation in ms
    easing: "ease-in-out", // Optional Easing Function
  });
};

export default ScrollAnimation;
