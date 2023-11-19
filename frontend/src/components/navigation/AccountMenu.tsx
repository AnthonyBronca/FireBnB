
import './css/accountMenu.css'
import hamburger from '../../assets/icons/hamburger.svg'
import usericon from '../../assets/icons/user.svg';
import { useContext, useState } from 'react';
import { useAppSelector } from '../../store';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import LoginModalContext from '../../context/LoginModalContext';
import { useNavigate } from 'react-router-dom';


const AccountMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {toggleOpen} = useContext(LoginModalContext);
    const user = useAppSelector((state)=> state.session.user);

    const [isOpen, setIsOpen] = useState(false)

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        if(menuOpen){
            setMenuOpen(false)
        } else{
            setMenuOpen(true)
        }
    }

    const handleModalOpen = (e:React.MouseEvent<HTMLSpanElement>, buttonClicked: string) => {
        e.preventDefault();
        toggleOpen(buttonClicked);
        handleSignIn();
    }


    const handleSignIn = () => {
        // e.preventDefault();
        // e.stopPropagation();
        if(isOpen){
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
        // dispatch(login({credential: 'anthony@user.io', password: 'password3'}))
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

    const goToListASpot = () => {
        navigate('/become-a-host')
        handleMenuOpen()
    }


  return (
    <div
    onClick={handleMenuOpen}
    className='nav-bar-drop-down-container'>
        <div className='user-container'>
            <div className='nav-bar-drop-down-buttons'>
            <img src={hamburger} alt='hamburger menu' className='hamburger-icon' />
            {user ?
            <div className="user-letter-container">
                <span className='user-letter'>{user.firstName[0]}</span>
                <div className='notification-container'>
                    <span className='notification-num'>{5}</span>
                </div>
            </div>
            : <img src={usericon} className='anon-avatar-icon' alt='avatar logo'/>}
            </div>
        </div>
        {user ? <>
        {menuOpen? <div className='drop-down-container'>
            <span onClick={handleFutureFeature} className='reg-span'>Messages</span>
            <span onClick={handleFutureFeature} className='reg-span'>Notifications</span>
            <span onClick={handleFutureFeature} className='reg-span'>Trips</span>
            <span onClick={handleFutureFeature} className='reg-span'>Wishlists</span>
            <div onClick={handleFutureFeature} className='horizontal-line'></div>
            <span onClick={goToListASpot} className='unreg-span'>Firebnb your home</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Account</span>
            <div onClick={handleFutureFeature} className='horizontal-line'></div>
            <span onClick={handleFutureFeature} className='unreg-span'>Help Center</span>
            <span onClick={(e:any) => handleLogout(e)} className='unreg-span'>Log out</span>
        </div>
        : null}
        </>
        : <>
        {menuOpen ? <div className='drop-down-container-not-logged'>
            <span onClick={(e:React.MouseEvent<HTMLSpanElement>) => handleModalOpen(e, "signin")} className='reg-span'>Sign up</span>
            <span onClick={(e:React.MouseEvent<HTMLSpanElement>) => handleModalOpen(e, "login")} className='unreg-span'>Log in</span>
            <Divider />
            <span onClick={goToListASpot} className='unreg-span'>Firebnb your home</span>
            <span onClick={handleFutureFeature} className='unreg-span'>Help Center</span>
        </div>: null}
        </>
        }
    </div>
  );
}

export default AccountMenu;
