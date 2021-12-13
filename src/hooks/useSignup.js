// firebase Authentication service
import { firebaseAuth } from "../firebase/config";
// hooks
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch: authDispatch } = useAuth();

  const signup = async (email, password, dispayName) => {
    setError(null);
    setIsPending(true);
    try {
      // signup action
      const signupResponse = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (signupResponse && !isCancelled && dispayName) {
        authDispatch({ type: "AUTH_IS_READY", payload: signupResponse.user });
        setIsPending(false);
        setIsPending(false);
        await signupResponse.user.updateProfile({ dispayName }).then(
          () => {
            setError(null);
            setIsPending(false);
          },
          (err) => {
            throw new Error(err.message);
          }
        );
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
