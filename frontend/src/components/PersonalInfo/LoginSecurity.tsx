import React, { useState } from 'react';
import { User } from '../../typings/redux';
import { useDispatch } from 'react-redux';
import AccountInfoHeader from './AccountInfoHeader';
import NavBar from '../Navigation/NavBar';
import { TextField } from '@mui/material';
import './LoginSecurity.css'
import { csrfFetch } from '../../store/csrf';
import { deleteUserThunk } from '../../store/session';
import { useNavigate } from 'react-router-dom';

interface IAccountProps {
    user: User | null;
    title: string;
}

const LoginSecurity:React.FC<IAccountProps> = ({user, title}): JSX.Element => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [editModePassword, setEditModePassword] = useState<boolean>(false);
     const [editPassword, setEditPassword] = useState<string | undefined>('')

    const handleEditPassword = () => {
        setEditModePassword(!editModePassword);
    };

    const savePassword = async () => {
        if(user?.id === 3){
            alert("Sorry, You can not edit the demo user account. Please create an account to test this feature.")
        } else {
            const form = {editPassword};
            if(user){
                const options = {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(form)
                }
                const response = await csrfFetch(`/api/users/${user.id}/password`, options);
                if(!response.ok){
                    alert("There was an error")
                } else{
                    const message = response.json()
                    console.log(message);
                }
            }
        }
        handleEditPassword();
    }

    const deleteAccount = async () => {
        if(user?.id === 3){
            alert("Sorry, You can not delete the demo user account. Please create an account to test this feature.")
        } else{
            if(user){
                const response = await dispatch(deleteUserThunk(user));
                if(response.ok){
                    navigate('/');
                }
            }
        }
    }

  return (
  <div>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            <div className='user-info-container-dashboard'>
            <div className='tab-selection-container'>
                <span>Login</span>
            </div>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                    <h3>Login</h3>
                    <div className='user-info-text-container'>
                       <p>Password</p>
                       <p>Last updated 5 months ago</p>
                       { editModePassword? <TextField
                         id="filled-basic"
                         label="Password"
                         variant='filled'
                         size='small'
                         type='password'
                         InputLabelProps={{
                             style: {
                                 fontSize: '12px',
                                 fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }}
                            value={editPassword}
                            inputProps={{style: {
                                height: '.7rem',
                                backgroundColor: 'white',
                                border: '1px solid rgba(15, 15, 15, .2)',
                                borderRadius: '5px',
                                fontSize: '12px',
                            }}}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditPassword(e.target.value)}
                            />: null}
                            {editModePassword? <button className='save-button-edit' onClick={savePassword}>Save</button>: null}
                    </div>
                    </div>
                    <div>
                        <span className='edit-span-button update-button' onClick={handleEditPassword}>{editModePassword? "Cancel": "Update"}</span>
                    </div>
                </div>

            </div>
            <div className='user-info-container-dashboard'>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                    <h3>Account</h3>
                    <div className='user-info-text-container'>
                       <p></p>
                       <p>Deactivate your account</p>
                    </div>
                    </div>
                    <div>
                        <span className='edit-span-button deactivate' onClick={deleteAccount}>{"Deactivate"}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
}

export default LoginSecurity;
