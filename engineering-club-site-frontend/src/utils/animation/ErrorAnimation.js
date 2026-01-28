import Lottie from "lottie-react";
import animationData from "../../assets/fetching-data-error-animation.json";

const ErrorAnimation = () => {
  return (
    <>
      <div
        style={{
          width: "20%",
          overflow: "hidden",
        }}
        className="d-none d-lg-block"
      >
        <Lottie animationData={animationData} loop autoplay />
      </div>

      {/* Mobile view  */}
      <div
        style={{
          width: "50%",
          overflow: "hidden",
        }}
        className="d-lg-none"
      >
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </>
  );
};

export default ErrorAnimation;
