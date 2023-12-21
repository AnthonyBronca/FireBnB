import React from 'react';
import './BookingForm.css'


const BookingForm: React.FC = (): JSX.Element => {
  return (
    <div className='booking-form-container'>
        <div className='price-container'>
            <span>$175</span>
            <span>night</span>
        </div>
        <div className='date-container'>
            <div className='date-container-top'>
                <input placeholder='1/21/2024'/>
                <input placeholder='1/22/2024'/>
            </div>
            <div className='date-container-bottom'>
                <input placeholder='guests'/>
            </div>
        </div>
    </div>
  );
}

export default BookingForm;
