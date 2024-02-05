import RootNavigation from './Navigation';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RootNavigation/>
    </ReduxProvider>
  );
};