import React, { MouseEventHandler } from 'react';
import '../css/Tiles.css'
import { useNavigate } from 'react-router-dom';

export interface ITileProps {
    icon: string;
    title: string;
    description: string;
    active?: string;
    action?: MouseEventHandler<HTMLDivElement>;
    name?: string;

}




const Tiles: React.FC<ITileProps> = ({
    icon,
    title,
    description,
    active,
    action,
    name
    }): JSX.Element => {

const navigate = useNavigate();

const activeFunctions:any = {
  personalInfo: ()=> {
    navigate('/personal-info')
  },
  accountDetails: () => {
    navigate('/account-details')
  },
  manageListings: () => {
    navigate('/manage-listings')
  },
  manageReviews: () => {
    navigate('/manage-reviews')
  }

}


  return (
    <div className={`tile-container ${active}`} onClick={name? activeFunctions[`${name}`]:action}>
        <img src={icon} alt='icon for tile'/>
        <h2>{title}</h2>
        <span>{description}</span>
    </div>
  );
}

export default Tiles;
