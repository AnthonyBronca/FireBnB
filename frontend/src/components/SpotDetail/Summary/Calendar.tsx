import React, {useState} from 'react';
// import ReactCalendar from 'react-calendar';
import './calendar.css'
import 'react-date-range/dist/styles.css' //main style file
import 'react-date-range/dist/theme/default.css' //theme css file

import { DateRange} from 'react-date-range';
import { addDays, startOfTomorrow } from 'date-fns';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];


interface ISelection {
  startDate: Date;
  endDate: Date;
  key: string;
  color: string;
}

const MyCalendar: React.FC = (): JSX.Element => {

  const selectionRange = {
    startDate: new Date(),
    endDate: startOfTomorrow(),
    key: 'selection',
    color: "rgb(215,215,215)"
  }
  const [selection, setSelection] = useState<ISelection>(selectionRange)


  const handleSelect = (date: any) => {
    const newSelection:ISelection = {
      startDate: date.selection.startDate,
      endDate: date.selection.endDate,
      key: 'selection',
      color: 'rgb(215,215,215)'
    }
    setSelection(newSelection);
  }


      // Custom tile content function to render white background tiles
  return (
    <div className='calendar-container'>
        <div className='calendar-header'>
            <h2>Select check-in date</h2>
            <span className='calendar-header-info-span'>Add your travel dates for exact pricing</span>
        </div>
        <div className="react-calendar-container">
          <DateRange
            ranges={[selection]}
            onChange={handleSelect}
            showDateDisplay={false}
            editableDateInputs={true}
            showPreview={true}
            dragSelectionEnabled={true}
            weekdayDisplayFormat='E'
            minDate={addDays(new Date(), 0)}
          />
        </div>
    </div>
  );
}

export default MyCalendar;
