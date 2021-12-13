// firebase auth service
import { firebaseAuth } from "../firebase/config";
// hooks
import { useState } from "react";
import { useAuth } from "./useAuth";
export default function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();
  const logout = async () => {
    setIsPending(true);
    try {
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
