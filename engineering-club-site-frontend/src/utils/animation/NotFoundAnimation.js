import Lottie from 'lottie-react';
import animationData from '../../assets/not-found-animation.json';

const NotFoundAnimation = () => {
  return (
    <div
      style={{
        width: "90%",
        overflow: "hidden"
      }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

export default NotFoundAnimation;