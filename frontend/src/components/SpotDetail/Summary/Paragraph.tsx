import React from 'react';
import './summary.css'
import { Spot } from '../../../typings/redux';


interface IParagraph {
  spot: Spot
}


const Paragraph:React.FC<IParagraph> = ({spot}): JSX.Element => {
  return (
    <div className='paragraph-container'>
        <p className='paragraph-text'>{spot.description}</p>
    </div>
  );
}

export default Paragraph;
