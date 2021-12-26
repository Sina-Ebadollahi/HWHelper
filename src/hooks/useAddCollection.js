// hooks
import { useState } from "react";
// firebase services
import { firestore, timestamp } from "../firebase/config";

export default function useAddCollection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const addCollectionAction = async (collectionPath, theObject) => {
    if (collectionPath && theObject) {
      setIsPending(true);
      try {
        let createdAt = timestamp.fromDate(new Date());
        await firestore
          .collection(collectionPath)
          .doc(`project${Math.floor(Math.random() * 1000000)}`)
          .set({ ...theObject, createdAt });
        setIsPending(false);
        setSuccess(true);
      } catch (er) {
        setSuccess(false);
        setIsPending(false);
        setError(er.message);
      }
    }
  };
  return {
    addCollectionAction,
    success,
    error,
    isPending,
  };
}
