import './accountMenu.css'
import hamburger from '../../assets/icons/hamburger.svg'
import { useState } from 'react';
const AccountMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        if(menuOpen){
            setMenuOpen(false)
        } else{
            setMenuOpen(true)
        }
    }

    const handleFutureFeature = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        alert("This feature is in development and will be released soon!");
        handleMenuOpen();
    }

  return (
    <div
    onClick={handleMenuOpen}
    className='nav-bar-drop-down-container'>
        <div className='user-container'>
            <img src={hamburger} alt='hamburger menu' className='hamburger-icon' />
            <div className="user-letter-container">
                <span className='user-letter'>A</span>
                <div className='notification-container'>
                    <span className='notification-num'>1</span>
                </div>
            </div>
        </div>
        {menuOpen? <div className='drop-down-container'>
            <span onClick={handleFutureFeature} className='reg-span'>Messages</span>
            <span onClick={handleFutureFeature} className='reg-span'>Notifications</span>
            <span onClick={handleFutureFeature} className='reg-span'>Trips</span>
            <span onClick={handleFutureFeature} className='reg-span'>Wishlists</span>
            <div onClick={handleFutureFeature} className='horizontal-line'></div>
            <span onClick={handleFutureFeature} className='unreg-span'>Firebnb your home</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Account</span>
            <div onClick={handleFutureFeature} className='horizontal-line'></div>
            <span onClick={handleFutureFeature} className='unreg-span'>Help Center</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Log out</span>
        </div>
        : null}
    </div>
  );
}

export default AccountMenu;
