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
      element: <Splash />,
    },
    {
      path: '/spot/:id',
      element: <SpotDetail />
    },
    {
      path: '/become-a-host',
      element: user ? <NewSpotForm />: <Splash login={true}/>
    },
    {
      path: '/login',
      element: <LoginModal menuOption='login'/>
    },
    {
      path: '*',
      element: <h1>404: Error Page</h1>
    }
  ]


  const routing = useRoutes(mainRoutes);

  function generateLoading(){
    if(!isLoaded){
      setTimeout(()=> {
        return <h1>Loading...</h1>
      }, 1000)
    } else{
      return null
    }
  }


  if(!isLoaded){
    return generateLoading()
  } else {
    return (
      <div className='app-container'>
      <LoginModalContext.Provider value={{open: loginModalOpen, toggleOpen}}>
      {routing}
      {loginModalOpen? <LoginModal menuOption={loginModalDisplay} /> : null}
      </LoginModalContext.Provider>
      </div>
    )
  }
};

export default App
