import { useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext can only be used between AuthContext');
  }

  return context;
};
