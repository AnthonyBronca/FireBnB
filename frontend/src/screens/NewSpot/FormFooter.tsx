import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import './css/list-footer.css';


interface ButtonFuncProps{
    nextStep: React.Dispatch<React.SetStateAction<number>>;
    newVal: number;
    text: string;
    classVal: string;
    count: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;

}


const FormFooter: React.FC<ButtonFuncProps> = ({nextStep, newVal, text, classVal, count}): JSX.Element => {


  return (
    <>
    <footer className={`list-form-footer-${classVal}`}>
        <div className={`form-container-${classVal}`}>
            {newVal >= 25? <span className='next-back' onClick={()=> nextStep(newVal - count)}>Back</span>: null}
            <button className={`button-${classVal}`} onClick={()=> nextStep(newVal + count)}>{text}</button>
        </div>
    </footer>
    </>
  );
}

export default FormFooter;
