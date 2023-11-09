import { createContext} from 'react';
import { SignInContext } from '../typings/modal';


const defaultState:SignInContext = {
  open: false,
  toggleSignIn: ()=> console.log('toggling')
}

const SignInButtonContext = createContext(defaultState);

export default SignInButtonContext
