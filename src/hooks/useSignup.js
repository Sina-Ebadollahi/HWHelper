// firebase Authentication service
import { firebaseAuth, firestoreStorage, firestore } from "../firebase/config";
// hooks
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch: authDispatch } = useAuth();

  const signup = async (
    email,
    password,
    dispayName,
    thumbnail,
    userCollection
  ) => {
    setError(null);
    setIsPending(true);
    try {
      // signup action
      const signupResponse = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // uploading the thumbnail to the storage
      let thumbnailPath = `thumbnail/${signupResponse.user.uid}/thumbnail.png`;
      const imgUploadResponse = await firestoreStorage
        .ref(thumbnailPath)
        .put(thumbnail);
      const imgDownloadUrl = await imgUploadResponse.ref.getDownloadURL();
      if (signupResponse && !isCancelled && dispayName) {
        authDispatch({ type: "AUTH_IS_READY", payload: signupResponse.user });
        setIsPending(false);
        // create a user document

        let userData = {
          online: true,
          photoURL: imgDownloadUrl,
          userName: dispayName,
        };
        const addUserDocument = await firestore
          .collection(userCollection)
          .doc(signupResponse.user.uid)
          .set(userData);

        await signupResponse.user
          .updateProfile({ dispayName, photoURL: imgDownloadUrl })
          .then(
            () => {
              setError(null);
              setIsPending(false);
            },
            (err) => {
              throw new Error(err.message);
            }
          );
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  });
  return { signup, error, isPending };
}
