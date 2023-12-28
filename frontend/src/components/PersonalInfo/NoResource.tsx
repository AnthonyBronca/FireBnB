import React from 'react';
import NavBar from '../Nav/NavBar';
import { User } from '../../typings/redux';
import AccountInfoHeader from './AccountInfoHeader';


interface INoResourceProps {
    title: string;
    user: User | null;
}


const NoResource: React.FC<INoResourceProps> = ({user, title}): JSX.Element => {
  return (
    <div className='no-resource-container'>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            <div className='user-info-container-dashboard'>
                <h1>{`You do not currently have any ${title}`}</h1>
            </div>
        </div>
    </div>
  );
}

export default NoResource;
