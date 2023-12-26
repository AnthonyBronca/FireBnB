import './App.css'
import { useRoutes} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store';
import { useEffect, useState } from 'react';
import * as sessionActions from './store/session'
import Splash from './screens/Splash/Splash';
import LoginModalContext from './context/LoginModalContext';
import LoginModal from './components/Modals/LoginModal';
import SpotDetail from './screens/SpotDetailPage/SpotDetail';
import NewSpotForm from './screens/NewSpot/NewSpot'
import UserDashboard from './screens/UserDashboard';
import {SkeletonTheme} from 'react-loading-skeleton'
import PersonalInfo from './components/PersonalInfo';
import { Skeleton } from '@mui/material';
import LoginSecurity from './components/PersonalInfo/LoginSecurity';
import ManageListings from './components/PersonalInfo/ManageListings';

const App: React.FC = ():JSX.Element | undefined | null => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginModalOpen, setLoginModal] = useState(false)

  const [loginModalDisplay, setLoginModalDisplay] = useState('signup');

  const restoreXSRF = async () => {
    const res = await fetch('/api/csrf/restore');
    if (res.ok) {
      let data = await res.json();
      document.cookie = data;
    } else {
      throw new Error("Could not restore token.")
    }
  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => restoreXSRF()).then(() => setIsLoaded(true));
  }, [dispatch]);


  const toggleOpen = (buttonClicked:string) => {
    if(buttonClicked === 'login'){
      setLoginModalDisplay('login')
    } else if (buttonClicked === 'signup'){
      setLoginModalDisplay('signup');
    }
    setLoginModal(!loginModalOpen);

  }


  const mainRoutes = [
    {
      path: '/',
      element: <Splash loading={isLoaded} />,
    },
    {
      path: '/spot/:id',
      element: <SpotDetail />
    },
    {
      path: '/become-a-host',
      element: user ? <NewSpotForm />: <Splash loading={isLoaded}  login={true}/>
    },
    {
      path: '/login',
      element: <LoginModal menuOption='login'/>
    },
    {
      path: '/account-settings',
      element: <UserDashboard user={user} />,
    },
    {
      path: '/account-details',
      element: <LoginSecurity user={user} title='Login & Security'/>,
    },
    {
      path: '/manage-listings',
      element: <ManageListings user={user} title='Manage Listings'/>,
    },
    {
      path: '/manage-reviews',
      element: <h1>Hi from manage-reviews</h1>,
    },
    {
      path: '/personal-info',
      element: <PersonalInfo user={user} title='Personal info'/>
    },
    {
      path: '*',
      element: <h1>404: Error Page</h1>
    }
  ]


  const routing = useRoutes(mainRoutes);


  if(!isLoaded){
    return <Skeleton />
  } else {
    return (
      <div className='app-container'>
        <LoginModalContext.Provider value={{open: loginModalOpen, toggleOpen}}>
          <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
            {routing}
          </SkeletonTheme>
      {loginModalOpen? <LoginModal menuOption={loginModalDisplay} /> : null}
        </LoginModalContext.Provider>
      </div>
    )
  }
};

export default App
