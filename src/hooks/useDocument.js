// firebase service
import { firestore } from "../firebase/config";
// hooks
import { useEffect, useState } from "react";
export default function useDocument(collection, documentID) {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebaseRef = firestore.collection(collection).doc(documentID);
    const unSub = firebaseRef.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDoc({
            ...snapshot.data(),
            id: snapshot.id,
          });
        } else {
          setError("document not exists.");
        }
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
    return () => {
      unSub();
    };
  }, [collection, documentID]);

  return {
    doc,
    error,
  };
}
