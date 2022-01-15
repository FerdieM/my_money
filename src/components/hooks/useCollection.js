import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query) => {
  const [documents, seDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;

  const dispErr = (err) => {
    setError('Could not fetch the data');
    console.log(err.message);
  };

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        // update State
        seDocuments(results);
        setError(null);
      },
      (err) => {
        dispErr(err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { documents, error };
};
