import React, {useState} from 'react';
import './BookingForm.css'
import { guestCount } from './guestCount';
import { endDateValidation } from './dateValidation';
// import { useAppSelector } from '../../store';

interface IBookingFormProps {
    spotId: number;
}

const BookingForm: React.FC<IBookingFormProps> = ({}): JSX.Element => {
    // const user = useAppSelector((state)=> state.session.user);

    const [startDate, setStartDate] = useState<string>('')
    const [_endDate, setEndDate] = useState<string>('');
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

    const checkBooking = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        alert("Future Feature. Currently in development")

        // if(user){
        //     let booking = {
        //         userId: user.id,
        //         spotId,
        //         // startDate,
        //         // endDate,
        //         // guest
        //     }
        //     const options = {
        //         method: 'GET',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(booking)
        //     }
            // const res = await csrfFetch(`/api/spots/:${spotId}/bookings`);
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
                <button onClick={(e)=> checkBooking(e)} className='availability-btn'>Check availability</button>
            </div>
        </form>
    </div>
  );
}

export default BookingForm;
