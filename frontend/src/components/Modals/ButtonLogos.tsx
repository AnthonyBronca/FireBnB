import metalogo from '../../assets/icons/meta.svg';
import googlelogo from '../../assets/icons/google.svg';
import applelogo from '../../assets/icons/apple.svg';
import emailIcon from '../../assets/icons/email.svg';

import Button from '@mui/material/Button';

import './css/buttonlogos.css'

const EmailIcon = () => {
     return(
        <>
         <Button
            variant='outlined'
            startIcon={<img className='email-icon' src={emailIcon} />}
            sx={{
                fontSize: '8px',
                color: 'rgba(8, 8, 8, 8)',
                fontFamily: "Arial, Helvetica, sans-serif",
                borderColor: 'rgba(15, 15, 15, .4)',
                marginTop: '10px'
            }}>Continue with email</Button>
        </>
    )
}

const AppleLogo = () => {
    return(
        <>
         <Button
            variant='outlined'
            startIcon={<img className='apple-icon' src={applelogo} />}
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
        <EmailIcon />
        </>
    )
}
export default ButtonLogos
