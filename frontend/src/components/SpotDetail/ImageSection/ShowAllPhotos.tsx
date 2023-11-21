import React from 'react';
import './showAllPhotos.css'
import grid from '../../../assets/icons/show-all-grid.svg'

const ShowAllPhotos: React.FC = (): JSX.Element => {

    const showAll = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        alert('Future feature!')
    }

  return (
    <div className='show-all-main-container'>
        <div className='show-all-photos-container' onClick={showAll}>
            <div className='show-all-icon'>
                <img className="show-all-grid" src={grid}/>
            </div>
            <div className='show-all-span-container'>
                <span className='show-all-span' >Show all photos</span>
            </div>
        </div>
    </div>
  );
}

export default ShowAllPhotos;
