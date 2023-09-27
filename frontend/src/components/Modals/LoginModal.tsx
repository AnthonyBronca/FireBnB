import { Divider } from '@mui/material';
import './css/loginmodal.css'
import { useContext, useEffect, useState } from 'react';
import LoginModalContext from '../../context/LoginModalContext';
import xlogo from '../../assets/icons/x.svg'
import TextField from '@mui/material/TextField';
import ButtonLogos from './ButtonLogos';

const LoginModal = () => {
    const {open, toggleOpen} = useContext(LoginModalContext);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('')


    useEffect(()=> {
        const loginmodal = document.getElementsByClassName('login-modal');
        if(loginmodal[0]){
            loginmodal[0].addEventListener('click', (e)=> {
                if(e.target !== null){
                    if(e.target === e.currentTarget){
                        handleClose();
                    }
                }
            })
        }
    })



    const handleClose = () => {
        if(open){
            toggleOpen();
        }
        return;
    }

  return (
    <div className="login-modal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-header-contents">
                    <button className="close-button" onClick={handleClose}>
                        <img src={xlogo} alt="close icon" className="close-button-image"/>
                    </button>
                    <span className='login-header-span'>Log in or sign up</span>
                </div>
                <Divider />
            </div>
            <h3>Welcome to Firebnb</h3>
            <div className="input-boxes-sign-in">
                <form style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    id="filled-basic"
                    label="Credential"
                    variant='filled'
                    size='small'
                    InputLabelProps={{
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }
                    }}
                    inputProps={{style: {
                        height: '.7rem',
                        backgroundColor: 'white',
                        border: '1px solid rgba(15, 15, 15, .2)',
                        borderRadius: '5px',
                        fontSize: '12px'
                    }}}

                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredential(e.target.value)}
                    />
                <TextField
                    id="filled-basic"
                    label="Password"
                    variant='filled'
                    type='password'
                    size='small'
                    style={{}}
                    InputLabelProps={{
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }
                    }}
                    inputProps={{style: {
                        height: '.7rem',
                        backgroundColor: 'white',
                        border: '1px solid rgba(15, 15, 15, .2)',
                        borderRadius: '5px',
                        fontSize: '12px',
                        borderBottom: 'none'
                    }}}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    </form>
                    <span className='login-modal-disclaimer'>
                        We will NOT call or text you to confirm your number.
                         Standard message and data rates will not apply.
                    </span>
                    <button className='continue-button'>Continue</button>
                    <div className='auth-buttons-container'>
                    </div>
                    <Divider><span className='or-span'>or</span></Divider>
                        <ButtonLogos />
                    </div>
        </div>
    </div>
  );
}

export default LoginModal;
