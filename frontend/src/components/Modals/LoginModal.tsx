import { Divider } from '@mui/material';
import './css/loginmodal.css'
import React, { useContext, useEffect, useState } from 'react';
import LoginModalContext from '../../context/LoginModalContext';
import xlogo from '../../assets/icons/x.svg'
import TextField from '@mui/material/TextField';
import ButtonLogos from './ButtonLogos';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';

const LoginModal = () => {
    const dispatch = useDispatch();
    const {open, toggleOpen} = useContext(LoginModalContext);

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('am i here?')
        setErrors([]);
        let err = [];
        if(!firstName.length){
            err.push("You must enter a First Name");
        }
        if(!lastName.length){
            err.push("You must enter a Last Name");
        }
        if(!username.length){
            err.push("You must enter a username");
        }
        if(!email.length){
            err.push("You must enter an email");
        }
        if(!password.length){
            err.push('You must enter a password')
        }
        if(err.length){
            errors.push(...err)
            return;
        } else{
            if(!errors.length){
                let user = {firstName, lastName, email, username, password}
                let res = await dispatch(signup(user));
                if(res){
                    if(!res.message.startsWith("Validation error:")){
                        let errs: string[] = Object.values(res.errors);
                        setErrors(errs);
                    } else {
                        let errs: string[] = [res.message];
                        setErrors(errs);
                    }
                } else {
                    toggleOpen()
                }
            }
        }
    }


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
                <form onSubmit={(e:any)=> handleSubmit(e)} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    id="filled-basic"
                    label="Email"
                    variant='filled'
                    size='small'
                    type='email'
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

                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                <TextField
                    id="filled-basic"
                    label="Username"
                    variant='filled'
                    // type='text'
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                <TextField
                    id="filled-basic"
                    label="First Name"
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

                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
                    />
                <TextField
                    id="filled-basic"
                    label="Last Name"
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

                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
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

                    <span className='login-modal-disclaimer'>
                        We will NOT call or text you to confirm your number.
                         Standard message and data rates will not apply.
                    </span>
                    { errors.length > 0 ?<div className='errors-box-login'>
                        <ul>
                            {errors.map((err, key) => <li><span key={key} className='sign-up-error-span'> {err}</span></li>
                        )}
                        </ul>
                    </div>: null}
                    <button type='submit' onClick={(e:any) => handleSubmit(e)} className='continue-button'>Continue</button>
                    </form>
                    <div className='auth-buttons-container'>
                    </div>
                    <Divider><span className='or-span'>or</span></Divider>
                        <ButtonLogos/>
                    </div>
        </div>
    </div>
  );
}

export default LoginModal;
