// import React from 'react';
// import firebnb from '../../assets/images/firbnb_logo.svg'
import firenation from '../../assets/images/fire-nation.png'
import './css/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import globe from '../../assets/icons/globe.svg'
import AccountMenu from './AccountMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';



const NavBar = () => {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.session.user);
    const goToHome = () =>{
        navigate('/')
    }

const handleAuthCheck = () => {
    if(!user){
        goToHome();
    } else{
        navigate('/become-a-host')
    }
}

  return (
    <>
    <div className='nav-bar-container '>
        <div className='nav-logo-container' onClick={goToHome}>
            <img src={firenation} className='logo' alt='logo'/>
            <span>firebnb</span>
        </div>
        <div className='filter-container'>
            <div className='filter-item'>
                <span>Anywhere</span>
                <div className='vertical-divider'></div>
            </div>
            <div className='filter-item'>
                <span>Any week</span>
                <div className='vertical-divider'></div>
            </div>
            <div className='filter-item guest-item'>
                <span>Add guests</span>
                <div className='search-container'>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: 'white'}}/>
                </div>
            </div>
        </div>
        <div className='nav-bar-links-container'>
            <div className='host-home'>
                <Link className='a-tag' onClick={handleAuthCheck} to={'/'}><span className='nav-bar-links-span'>Firebnb your home</span></Link>
            </div>
            <img src={globe} alt='global setting icon' className='globe-icon' />
            <AccountMenu />
        </div>
    </div>
    </>
  );
}

export default NavBar;
