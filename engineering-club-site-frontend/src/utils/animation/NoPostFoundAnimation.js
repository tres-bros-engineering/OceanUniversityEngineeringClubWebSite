import Lottie from 'lottie-react';
import animationData from '../../assets/no-post-found-animation.json';

const NoPostFoundAnimation = () => {
  return (
    <div
      style={{
        width: "50%",
        overflow: "hidden"
      }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
};

export default NoPostFoundAnimation;