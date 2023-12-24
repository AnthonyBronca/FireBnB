import React from 'react';
import './AccountInfoHeader.css'
import { User } from '../../typings/redux';
import { useNavigate } from 'react-router-dom';
import arrow from './arrow.png'

interface IAccountProps {
    user: User | null;
    title: string;
}

const AccountInfoHeader:React.FC<IAccountProps> = ({user, title}): JSX.Element | undefined => {
    const navigate = useNavigate();

    const navigateToAccount = () => {
        navigate('/account-settings')
    }

    if(!user || !title){
        navigate('/');
        return;
    } else{
        return (
            <div className='account-info-container'>
                <div className='account-info-header'>
                    <span onClick={navigateToAccount}>Account</span>
                    <img src={arrow} alt='arrow-icon' />
                    <span>{title}</span>
                    <h1>{title}</h1>
                </div>
            </div>
        );
    }
}

export default AccountInfoHeader;
