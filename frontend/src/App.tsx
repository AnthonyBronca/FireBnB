import './App.css'
import { useRoutes } from 'react-router-dom'
import { useAppDispatch } from './store';
import { useEffect, useState } from 'react';
import * as sessionActions from './store/session'
import Splash from './screens/Splash/Splash';
import NavBar from './components/navigation/NavBar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import { Divider } from '@mui/material';
import LoginModalContext from './context/LoginModalContext';
import LoginModal from './components/Modals/LoginModal';

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginModalOpen, setLoginModal] = useState(false)

  const toggleOpen = () => {
    setLoginModal(!loginModalOpen);
  }


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


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
      path: '/account',
      element: <UserDashboard />,
    }
  ]
  // children: [
  //   { path: '*', element: <Navigate to={'/404'}/> },
  //   { path: '/', element: <NavBar />},
  //   {path: '404', element: <h1>404 Not Found</h1>},
  // ],


  const routing = useRoutes(mainRoutes);

  if (!isLoaded) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <LoginModalContext.Provider value={{ open: loginModalOpen, toggleOpen }}>
          <NavBar />
          <Divider />
          {routing}
          <div onClick={toggleOpen}>
            {loginModalOpen ? <LoginModal /> : null}
          </div>
        </LoginModalContext.Provider>
      </>
    )
  }
};

export default App
