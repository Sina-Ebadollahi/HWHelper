// firebase auth service
import { firebaseAuth, firestore } from "../firebase/config";
// hooks
import { useState } from "react";
import useAuth from "./useAuth";
export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuth();
  const logout = async () => {
    setIsPending(true);
    try {
      // update user online status
      const { uid } = user;
      await firestore.collection("userData").doc(uid).update({ online: false });
      await firebaseAuth.signOut();
      dispatch({ type: "LOGOUT" });
      setError(null);
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  return { error, isPending, logout };
}
