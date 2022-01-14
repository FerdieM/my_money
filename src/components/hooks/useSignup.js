import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await res.user.updateProfile({ displayName });

      // dispatch Login
      dispatch({
        type: 'LOGIN',
        payload: res.user,
      });

      // set State

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
        console.log(res.user);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    error,
    isPending,
    signup,
  };
};
