import React from 'react';
import './summary.css'

const Paragraph:React.FC = (): JSX.Element => {
  return (
    <div className='paragraph-container'>
        <p className='paragraph-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis exercitationem corrupti maxime sequi quas placeat provident distinctio itaque. Nulla quod quaerat nobis ea! Explicabo assumenda deserunt error voluptatibus temporibus? Dolore!</p>
        <span >{'Show more'}</span>
    </div>
  );
}

export default Paragraph;
