import React, {useState} from 'react';
import ReactCalendar from 'react-calendar';
import './calendar.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


// const tileContent = () => {
//   // if (view === 'month') {
//     return (
//       <div style={{ backgroundColor: 'white', borderRadius: '50%', height: '100%', width: '100%' }}></div>
//     );
//   }
// // };
const Calendar: React.FC = (): JSX.Element => {

    const [value, setValue] = useState<Value>(new Date());

      // Custom tile content function to render white background tiles

  return (
    <div className='calendar-container'>
        <div className='calendar-header'>
            <h2>Select check-in date</h2>
            <span>Add your travel dates for exact pricing</span>
        </div>
        <div className="react-calendar-container">
            <ReactCalendar
                value={value}
                onChange={setValue}

                />
        </div>
    </div>
  );
}

export default Calendar;
