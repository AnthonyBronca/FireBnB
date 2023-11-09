import { createContext} from 'react';
import { ModalContext } from '../typings/modal';


const defaultState:ModalContext = {
  open: false,
  toggleOpen: ()=> console.log('toggling')
}

const LoginModalContext = createContext(defaultState);

export default LoginModalContext
