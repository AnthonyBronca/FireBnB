// import { useState } from 'react';
import './floatinginput.css'
// import { Divider } from '@mui/material';

const FloatingInput = () => {
    // const [placeHolderOn, setPlaceHolderOn] = useState(false)
    // const [inputValue, setInputValue] = useState('')

    // const outFocusPlaceHolder = () => {
    //     setPlaceHolderOn(false);
    // }

    // const focusPlaceHolder = () => {
    //     setPlaceHolderOn(true);
    //     setInputValue("+1")
    // }


  return (
    <div className='input-container'>
        <div className='entryarea'>
            <input placeholder="(XXX) XXX-XXXX" className='input-floating' inputMode='tel' type='tel' required={true} />
            <div className='labelline'>Phone Number</div>
        </div>
    </div>
  );
  }

export default FloatingInput;
