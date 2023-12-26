import React, { useState } from 'react';
import './PersonalInfo.css'
import { User } from '../../typings/redux';
import AccountInfoHeader from './AccountInfoHeader';
import NavBar from '../Nav/NavBar';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editUserThunk } from '../../store/session';

interface IAccountProps {
    user: User | null;
    title: string;
}


const PersonalInfo: React.FC<IAccountProps> = ({user, title}): JSX.Element => {
    const dispatch = useDispatch();
    const [editModeName, setEditModeName] = useState<boolean>(false);
    const [editFirstName, setFirstName] = useState<string | undefined>(user?.firstName);
    const [editLastName, setEditLastName] = useState<string | undefined>(user?.lastName);

    const [editModeEmail, setEditModeEmail] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<string | undefined>(user?.email);



    const handleEditName = () => {
        setEditModeName(!editModeName);
    };

    const handleEditEmail = () => {
        setEditModeEmail(!editModeEmail);
    }

    const saveName = () => {
        if(user?.id === 3){
            alert("Sorry, You can not edit the demo user account. Please create an account to test this feature.")
            return;
        } else{
            const form = {
                editFirstName,
                editLastName,
                editEmail
            };
            dispatch(editUserThunk(user, form));
            handleEditName()
        }
    }

    const saveEmail = () => {
      if(user?.id === 3){
            alert("Sorry, You can not edit the demo user account. Please create an account to test this feature.")
            return;
        } else{
            const form = {
                editFirstName,
                editLastName,
                editEmail
            };
            dispatch(editUserThunk(user, form));
            handleEditName()
        }
    }

    const handleFutureFeature = () => {
        alert("This is either a placeholder, or the feature is in development.")
    }

   return (
    <div>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            <div className='user-info-container-dashboard'>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                        <p>Legal name</p>
                        <p>{editModeName? "This is the name on your travel document, which could be a license or a passport." :`${user?.firstName} ${user?.lastName}`}</p>
                        <div className='edit-input-fields-container'>
                        { editModeName? <TextField
                         id="filled-basic"
                         label="First name"
                         variant='filled'
                         size='small'
                         type='text'
                         InputLabelProps={{
                             style: {
                                 fontSize: '12px',
                                 fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }}
                            value={editFirstName}
                            inputProps={{style: {
                                height: '.7rem',
                                backgroundColor: 'white',
                                border: '1px solid rgba(15, 15, 15, .2)',
                                borderRadius: '5px',
                                fontSize: '12px',
                            }}}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            />: null}
                        { editModeName? <TextField
                         id="filled-basic"
                         label="Last name"
                         variant='filled'
                         size='small'
                         type='text'
                         InputLabelProps={{
                             style: {
                                 fontSize: '12px',
                                 fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }}
                            value={editLastName}
                            inputProps={{style: {
                                height: '.7rem',
                                backgroundColor: 'white',
                                border: '1px solid rgba(15, 15, 15, .2)',
                                borderRadius: '5px',
                                fontSize: '12px',
                            }}}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditLastName(e.target.value)}
                            />: null}
                            </div>
                    {editModeName? <button className='save-button-edit' onClick={saveName}>Save</button>: null}
                    </div>
                    <div>
                        <span className='edit-span-button' onClick={handleEditName}>{editModeName? "Cancel": "Edit"}</span>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                        <p>Email address</p>
                        <p>{`${user?.email}`}</p>
                        <div className='edit-input-fields-container'>
                        { editModeEmail? <TextField
                         id="filled-basic"
                         label="Email"
                         variant='filled'
                         size='medium'
                         type='email'
                         InputLabelProps={{
                             style: {
                                 fontSize: '12px',
                                 fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }}
                            value={editEmail}
                            inputProps={{style: {
                                height: '.7rem',
                                backgroundColor: 'white',
                                border: '1px solid rgba(15, 15, 15, .2)',
                                borderRadius: '5px',
                                fontSize: '12px',
                            }}}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditEmail(e.target.value)}
                            />: null}
                            </div>
                            {editModeEmail? <button className='save-button-edit' onClick={saveEmail}>Save</button>: null}
                    </div>
                    <div className='span-button-container'>
                        <span className='edit-span-button' onClick={handleEditEmail}>{editModeEmail? "Cancel": "Edit"}</span>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                        <p>Phone Number</p>
                        <p>Not provided</p>
                    </div>
                    <div className='span-button-container'>
                        <span className='edit-span-button' onClick={handleFutureFeature}>Edit</span>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='user-info-text-container'>
                        <p>Address</p>
                        <p>Not Provided</p>
                    </div>
                    <div>
                        <span className='edit-span-button' onClick={handleFutureFeature}>Edit</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
}

export default PersonalInfo;
