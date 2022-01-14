import { projectAuth } from '../firebase/config';
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, logout };
};
