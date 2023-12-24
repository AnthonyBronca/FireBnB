import metalogo from '../../assets/icons/meta.svg';
import googlelogo from '../../assets/icons/google.svg';
import applelogo from '../../assets/icons/apple.svg';
import emailIcon from '../../assets/icons/email.svg';

import Button from '@mui/material/Button';

import './css/buttonlogos.css'
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import LoginModalContext from '../../context/LoginModalContext';



const EmailIcon= () => {
    const dispatch = useDispatch();

    const {toggleOpen} = useContext(LoginModalContext);

    const [credential] = useState('Joe_Demo');
    const [password] = useState('StrongDemoPassword!');

    const loginDemo = () => {
        dispatch(login({credential, password}))
        toggleOpen('signup');
    }

     return(
        <>
         <Button
            variant='outlined'
            startIcon={<img className='email-icon' src={emailIcon} />}
            onClick={() => loginDemo()}
            sx={{
                fontSize: '8px',
                color: 'rgba(8, 8, 8, 8)',
                fontFamily: "Arial, Helvetica, sans-serif",
                borderColor: 'rgba(15, 15, 15, .4)',
                marginTop: '10px'
            }}>Continue with Demo</Button>
        </>
    )
}

const AppleLogo = () => {
    return(
        <>
         <Button
            variant='outlined'
            startIcon={<img className='apple-icon' src={applelogo} />}
            onClick={()=> alert('Feature Will not be added due to costs by Apple')}
            sx={{
                fontSize: '8px',
                color: 'rgba(8, 8, 8, 8)',
                fontFamily: "Arial, Helvetica, sans-serif",
                borderColor: 'rgba(15, 15, 15, .4)',
                marginTop: '10px'
            }}>Continue with Apple</Button>
        </>
    )
}

const MetaLogo = () => {
    return (
        <>
         <Button
            variant='outlined'
            onClick={()=> alert('Feature Will not be added due to Meta account constraints')}
            startIcon={<img className='meta-icon' src={metalogo} />}
            sx={{
                fontSize: '8px',
                color: 'rgba(8, 8, 8, 8)',
                fontFamily: "Arial, Helvetica, sans-serif",
                borderColor: 'rgba(15, 15, 15, .4)',
                marginTop: '10px'
            }}>Continue with Facebook</Button>
        </>
    )
}

const GoogleLogo = () => {
    return (
          <>
         <Button
            variant='outlined'
            onClick={()=> alert('Feature Will not be added due to Google API costs')}
            startIcon={<img className='google-icon' src={googlelogo} />}
            sx={{
                fontSize: '8px',
                color: 'rgba(8, 8, 8, 8)',
                fontFamily: "Arial, Helvetica, sans-serif",
                borderColor: 'rgba(15, 15, 15, .4)',
                marginTop: '10px'
            }}>Continue with google</Button>
        </>
    )
}

const ButtonLogos = () => {

    return(
        <>
        <MetaLogo />
        <GoogleLogo />
        <AppleLogo />
        <EmailIcon/>
        </>
    )
}
export default ButtonLogos
