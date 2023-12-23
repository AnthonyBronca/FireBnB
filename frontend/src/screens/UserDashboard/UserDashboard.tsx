import React from 'react';
import './css/UserDashboard.css'
import { User } from '../../typings/redux';
import Header from './components/Header';
import Tiles from './components/Tiles';
import tileDetails from './tileDetails';
import NavBar from '../../components/Navigation/NavBar';
export interface IUserProps{
    user: User | null
}

const UserDashboard: React.FC<IUserProps> = ({user}): JSX.Element => {

  const handleDeleteAcc = () => {
    alert('future feature')
  }

  return (
    <div>
      <NavBar/>
        <Header user={user}/>
        <div className='tiles-container'>
            {tileDetails.map((prop, idx) => (
                <Tiles
                key={idx}
                icon={prop.icon}
                title={prop.title}
                description={prop.description}
                action={prop.action}
                active={prop.active}
                />
                ))}
        </div>
        <div className='delete-acc-container'>
          <p>Need to deactivate your account?</p>
          <p onClick={handleDeleteAcc}>Take care of that now</p>
        </div>
    </div>
  );
}

export default UserDashboard;
