// firebase Authentication service
import { firebaseAuth, firestore } from "../firebase/config";
// context Authentication
import useAuth from "./useAuth";
// hooks
import { useEffect, useState } from "react";

export default function useLogin() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();
  const loginAction = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const loginResponse = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(`in Login ${loginResponse.user.email}`);
      // if login was not successful
      if (!loginResponse) {
        throw new Error("Could not login Right Now!, Please try again later.");
      }
      // update the state if signin was successful
      if (loginResponse) {
        dispatch({ type: "LOGIN", payload: loginResponse.user });
        // updating user online status
        await firestore
          .collection("userData")
          .doc(loginResponse.user.uid)
          .set({ online: true });
        setIsPending(false);
        setError(null);
      }
    } catch (er) {
      // if (!isCancelled) {
      setIsPending(false);
      setError(er.message);
      // }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { error, isPending, isCancelled, loginAction };
}
