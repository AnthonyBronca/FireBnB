import {createContext} from 'react';
import { IDeleteFormModalContext } from '../typings/modal';

const defaultState: IDeleteFormModalContext = {
    deleteOpen: false,
    toggleDeleteOpen: ()=> console.log('toggling')
}

const DeleteFormModalContext = createContext(defaultState);
export default DeleteFormModalContext;
