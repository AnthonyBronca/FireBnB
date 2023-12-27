import { createContext} from 'react';
import { IEditFormModalContext} from '../typings/modal';

const defaultState: IEditFormModalContext = {
    open: false,
    toggleFormOpen: () => console.log('toggling')
}

const EditFormModalContext = createContext(defaultState);
export default EditFormModalContext;
