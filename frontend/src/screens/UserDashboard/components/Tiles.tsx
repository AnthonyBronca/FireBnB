import React, { MouseEventHandler } from 'react';
import '../css/Tiles.css'

export interface ITileProps {
    icon: string;
    title: string;
    description: string;
    action: MouseEventHandler<HTMLDivElement>
}


const Tiles: React.FC<ITileProps> = ({
    icon,
    title,
    description,
    action}): JSX.Element => {
        console.log(icon,title,description,action)
  return (
    <div className='tile-container' onClick={action}>
        <img src={icon} alt='icon for tile'/>
        <h2>{title}</h2>
        <span>{description}</span>
    </div>
  );
}

export default Tiles;
