import { createContext, useReducer } from 'react';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

export const Authreducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};

const initialState = {
  user: null,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Authreducer, initialState);

  console.log('AuthContext state', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
