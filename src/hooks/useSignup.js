// firebase Authentication service
import { firebaseAuth, firestoreStorage, firestore } from "../firebase/config";
// hooks
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      // signup action
      const signupResponse = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(`in signup ${signupResponse.user.email}`);
      // uploading the thumbnail to the storage
      let thumbnailPath = `thumbnail/${signupResponse.user.uid}/thumbnail.png`;
      const imgUploadResponse = await firestoreStorage
        .ref(thumbnailPath)
        .put(thumbnail);
      const imgDownloadUrl = await imgUploadResponse.ref.getDownloadURL();
      // if (!isCancelled) {
      dispatch({ type: "LOGIN", payload: signupResponse.user });
      await signupResponse.user.updateProfile({
        displayName: displayName,
        photoURL: imgDownloadUrl,
      });
      // const addUserDocument =
      await firestore.collection("userData").doc(signupResponse.user.uid).set({
        online: true,
        photoURL: imgDownloadUrl,
        displayName,
      });
      console.log("collection updated");

      setIsPending(false);
      setError(null);
      // }
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  useEffect(() => {
    return () => {
      console.log("isCancelled");
      setIsCancelled(true);
    };
  });
  return { signup, error, isPending };
}
