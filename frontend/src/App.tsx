// import { useState } from 'react'
import './App.css'
import { useRoutes} from 'react-router-dom'
// import NavBar from './components/navigation/NavBar'
import { useAppDispatch } from './store';
import { useEffect, useState } from 'react';
import * as sessionActions from './store/session'
import Splash from './screens/Splash/Splash';

const App: React.FC = ():JSX.Element => {

  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


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
      <>
      {routing}
      </>
    )
  }
};

export default App
