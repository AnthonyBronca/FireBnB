import React, {useState} from 'react';
import './BookingForm.css'
import { guestCount } from './guestCount';
import { endDateValidation } from './dateValidation';

const BookingForm: React.FC = (): JSX.Element => {
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('');
    const [guest, setGuest] = useState<string>('');

    const setStart = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setStartDate(e.target.value);
    };

    const setEnd = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setEndDate(e.target.value);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGuest(e.target.value);
    }

    const checkAvailability = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let booking = {
            startDate,
            endDate,
            guest
        }
        console.log(booking)
    }

  return (
    <div className='booking-form-container'>
        <div className='price-container'>
            <span>$175</span>
            <span>night</span>
        </div>
        <form>
            <div className='date-container'>
                <div className='date-container-top'>
                    <input
                        type='date'
                        className='date-left-input'
                        onFocus={(e) => setStart(e)}
                        min={startDate? startDate: endDateValidation('',true)}
                        />
                    <input
                        type='date'
                        className='date-right-input'
                        onFocus={(e) => setEnd(e)}
                        min={startDate.length > 0? endDateValidation(startDate): endDateValidation()}
                        />
                </div>
                <div className='date-container-bottom'>
                    <select
                        value={guest}
                        onChange={handleSelectChange}
                    >
                    <option value='' hidden disabled>Guests</option>
                        {guestCount.map((num)=> (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='availability-btn-container'>
                <button onClick={(e)=> checkAvailability(e)} className='availability-btn'>Check availability</button>
            </div>
        </form>
    </div>
  );
}

export default BookingForm;
