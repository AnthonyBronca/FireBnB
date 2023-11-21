import React, { MouseEventHandler } from 'react';


interface ButtonFuncProps{
    nextStep: MouseEventHandler
}


const FormFooter: React.FC<ButtonFuncProps> = ({nextStep}): JSX.Element => {
  return (
    <>
    <div  className='footer-line' style={{
        width: '200%',
        height: '4px',
        backgroundColor: 'rgb(190,190,190',
        position: 'relative',
        right: '10%'
    }}></div>
    <footer className='form-footer'>
        <button onClick={nextStep}>Get Started</button>
    </footer>
    </>
  );
}

export default FormFooter;
