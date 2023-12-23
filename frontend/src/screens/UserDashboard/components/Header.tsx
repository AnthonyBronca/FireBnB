import React from 'react';
import {User} from '../../../typings/redux'
import '.././css/Header.css'
interface IHeaderProps {
    user: User | null
}

const Header: React.FC<IHeaderProps> = ({user}): JSX.Element => {
  return (
    <div className='user-dashboard-header'>
      <div>
        <h1>Account</h1>
      </div>
      <div>
        <span>{`${user?.firstName} ${user?.lastName}, `}</span>
        <span>{`${user?.email}`}</span>
      </div>
    </div>
  );
}

export default Header;
