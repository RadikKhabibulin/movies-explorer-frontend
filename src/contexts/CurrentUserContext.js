import { createContext } from 'react';

export const CurrentUserContext = createContext();

export const defaultUser = {
    name: '',
    email: '',
    _id: ''
};
