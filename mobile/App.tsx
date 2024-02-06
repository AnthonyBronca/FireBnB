import RootNavigation from './Navigation';
import store from './store';
import { Provider as ReduxProvider } from 'react-redux';

export default function App() {

  window.store = store;

  return (
    <ReduxProvider store={store}>
      <RootNavigation/>
    </ReduxProvider>
  );
};
