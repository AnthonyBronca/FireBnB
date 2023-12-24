import React from 'react';
import './css/UserDashboard.css'
import { User } from '../../typings/redux';
import Header from './components/Header';
import Tiles from './components/Tiles';
import tileDetails from './tileDetails';
import NavBar from '../../components/Navigation/NavBar';
import { useDispatch } from 'react-redux';
import { deleteUserThunk } from '../../store/session';
import { useNavigate } from 'react-router-dom';
export interface IUserProps{
    user: User | null
}

const UserDashboard: React.FC<IUserProps> = ({user}): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAcc = () => {
    if(user?.id === 3){
      alert("You can not delete the demo user account. Please make an account to test this feature.")
    } else{
      dispatch(deleteUserThunk(user))
      .then(()=>{
        navigate('/')
      })
    }
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
                name={prop.name}
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
