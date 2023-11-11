import { Divider } from '@mui/material';
import './css/loginmodal.css'
import React, { useContext, useEffect, useState } from 'react';
import LoginModalContext from '../../context/LoginModalContext';
import xlogo from '../../assets/icons/x.svg'
import TextField from '@mui/material/TextField';
import ButtonLogos from './ButtonLogos';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../store/session';


interface LoginSignUpProp {
    menuOption: string;
}

//menuOption can be either login or signup
const LoginModal: React.FC<LoginSignUpProp> = ({menuOption}) => {
    const dispatch = useDispatch();
    const {open, toggleOpen} = useContext(LoginModalContext);

    //state change for form items
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState<string[]>([]);


    //handles submit for either login or sign up
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors([]);
        let err = [];

        if(!firstName.length && menuOption === 'signup'){
            err.push("You must enter a First Name");
        }
        if(!lastName.length && menuOption === 'signup'){
            err.push("You must enter a Last Name");
        }
        if(!username.length && (!email.length && menuOption === 'login')){
            err.push("You must enter a username or email");
        }
        if(!email.length && menuOption === 'signup'){
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
                //Sign up actions
                if(menuOption === 'signup'){
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
                        toggleOpen('signup')
                    }
                    //login actions
            } else{
                let credential = ""
                if(email){
                    credential = email;
                }
                if(username){
                    credential = username
                };
                let user = {credential, password};
                dispatch(login(user));
            }
        }
    }
    toggleOpen('signup')
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
            toggleOpen('signup');
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
                    label={menuOption === 'signup'? "Email": "Email or Username"}
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

                {menuOption === 'signup' ? <TextField
                    id="filled-basic"
                    label="Username"
                    variant='filled'
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
                    />: null}

                {menuOption === 'signup' ? <TextField
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
                    />: null}

                {menuOption === 'signup' ? <TextField
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
                    />: null}

                <TextField
                    id="filled-basic"
                    label="Password"
                    variant='filled'
                    type='password'
                    autoComplete='current-password'
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
                    { errors.length > 0 ? <div className='errors-box-login'>
                        <ul>
                            {errors.map((err, key) => <li><span key={key} className='sign-up-error-span'> {err}</span></li>
                        )}
                        </ul>
                    </div>: null}
                    <button
                        type='submit'
                        onClick={(e:any) => handleSubmit(e)}
                        className='continue-button'>{
                            menuOption === 'signup'? "Sign Up": "Continue"}
                            </button>
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
