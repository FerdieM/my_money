import { useReducer, useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };

    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };

    case 'ERROR':
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    default:
      return {
        document: null,
        isPending: false,
        error: null,
        success: null,
      };
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document

  const addDocument = async (doc) => {
    dispatchIfNotCancelled({
      type: 'IS_PENDING',
    });

    try {
      const createAt = timestamp.fromDate(new Date());
      console.log({ ...doc, createAt });

      const addedDocument = await ref.add({ ...doc, createAt });

      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  // delete a document

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, response };
};
