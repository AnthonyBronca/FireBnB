import './App.css'
import { useRoutes} from 'react-router-dom'
import { useAppDispatch } from './store';
import { useEffect, useState } from 'react';
import * as sessionActions from './store/session'
import Splash from './screens/Splash/Splash';
import NavBar from './components/navigation/NavBar';
import { Divider } from '@mui/material';
import LoginModalContext from './context/LoginModalContext';
import LoginModal from './components/Modals/LoginModal';
import SpotDetail from './screens/SpotDetailPage/SpotDetail';

const App: React.FC = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginModalOpen, setLoginModal] = useState(false)

  const [loginModalDisplay, setLoginModalDisplay] = useState('signup');

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
    element: <Splash />,
  },
  {
    path: '*',
    element: <h1>404: Error Page</h1>
  },
  {
    path: '/spot/:id',
    element: <SpotDetail />
  }

]
    // children: [
    //   { path: '*', element: <Navigate to={'/404'}/> },
    //   { path: '/', element: <NavBar />},
    //   {path: '404', element: <h1>404 Not Found</h1>},
    // ],


  const routing = useRoutes(mainRoutes);

  if(!isLoaded){
    return <h1>Loading...</h1>
  } else {
    return (
      <div className='app-container'>
      <LoginModalContext.Provider value={{open: loginModalOpen, toggleOpen}}>
      <NavBar />
      <Divider/>
      {routing}
      {loginModalOpen? <LoginModal menuOption={loginModalDisplay} /> : null}
      </LoginModalContext.Provider>
      </div>
    )
  }
};

export default App
