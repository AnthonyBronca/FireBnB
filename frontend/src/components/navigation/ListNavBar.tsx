import React from 'react';
import firebnbLogo from '../../assets/images/fire-nation.png'
import './css/listNavBar.css'
import { useNavigate } from 'react-router-dom';


const ListNavBar:React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const returnHome = ():void => {
        navigate('/')
    }


  return (
    <div className='list-nav-container'>
        <img
            src={firebnbLogo}
            className='firebnb-logo'
            onClick={returnHome}
            alt='firebnb logo'
            />
        <button
            className='save-button'
            onClick={returnHome}
            >Save & exit
        </button>
    </div>
  );
}

export default ListNavBar;
