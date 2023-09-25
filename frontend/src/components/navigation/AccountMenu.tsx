import './accountMenu.css'
import hamburger from '../../assets/icons/hamburger.svg'
import usericon from '../../assets/icons/user.svg';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/session';

const AccountMenu = () => {
    const dispatch = useDispatch();
    const user = useAppSelector((state)=> state.session.user);


    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        if(menuOpen){
            setMenuOpen(false)
        } else{
            setMenuOpen(true)
        }
    }

    const handleSignIn = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(login({credential: 'anthony@user.io', password: 'password3'}))
    }

      const handleLogout = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(false);
        dispatch(logout()).then(()=> window.location.reload())
    }

    const handleFutureFeature = () => {
        alert("This feature is in development and will be released soon!");
        handleMenuOpen();
    }

  return (
    <div
    onClick={handleMenuOpen}
    className='nav-bar-drop-down-container'>
        <div className='user-container'>
            <img src={hamburger} alt='hamburger menu' className='hamburger-icon' />
            {user ?
            <div className="user-letter-container">
                <span className='user-letter'>A</span>
                <div className='notification-container'>
                    <span className='notification-num'>1</span>
                </div>
            </div>
    : <img src={usericon} className='anon-avatar-icon' alt='avatar logo'/>}
        </div>
        {user ? <>
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
            <span onClick={(e:any) => handleLogout(e)} className='unreg-span'>Log out</span>
        </div>
        : null}
        </>
        : <>
        {menuOpen ? <div className='drop-down-container-not-logged'>
            <span onClick={(e:any) =>handleSignIn(e)} className='reg-span'>Log in</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Sign up</span>
            <Divider />
            <span onClick={handleFutureFeature} className='unreg-span'>Firebnb your home</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Help Center</span>
        </div>: null}
        </>
        }
    </div>
  );
}

export default AccountMenu;
