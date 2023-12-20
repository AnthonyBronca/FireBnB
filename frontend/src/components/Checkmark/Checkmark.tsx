import React from 'react';
import Lottie from 'lottie-react';
import checkmark_animation from '../../assets/animations/checkmark-animation.json'


const Checkmark: React.FC = (): JSX.Element => {
  return (
     <Lottie
      animationData={checkmark_animation}
      loop={false}
      style={{
        height: '300px',
        marginBottom: '35vh',
        marginTop: '15vh'
        }}/>
  );
}

export default Checkmark;
