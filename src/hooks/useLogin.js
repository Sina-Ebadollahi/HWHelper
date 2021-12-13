// firebase Authentication service
import { firebaseAuth } from "../firebase/config";
// context Authentication
import { useAuth } from "./useAuth";
// hooks
import { useEffect, useReducer } from "react";

let loginIntialize = {
  isCancelled: false,
  error: null,
  isPending: false,
};
const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_ACTION_FIRST":
      return {
        ...state,
        error: null,
        isPending: true,
      };
    case "IS_CANCELLED":
      return {
        ...state,
        isCancelled: true,
      };
    case "LOGIN":
      return {
        isCancelled: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        isPending: false,
      };
    default:
      return state;
  }
};
export default function useLogin() {
  const [loginState, dispatch] = useReducer(loginReducer, loginIntialize);
  const { dispatch: authDispatch } = useAuth();

  const loginAction = async (email, password) => {
    dispatch({ type: "LOGIN_ACTION_FIRST" });
    try {
      const loginResponse = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      // if login was not successful
      if (!loginResponse) {
        throw new Error("Could not login Right Now!, Please try again later.");
      }
      // update the state if signin was successful
      if (!loginState.isCancelled && loginResponse) {
        dispatch({ type: "LOGIN", payload: loginResponse.user });
        authDispatch({ type: "LOGIN", payload: loginResponse.user });
      }
    } catch (er) {
      if (!loginState.isCancelled) {
        dispatch({ type: "ERROR", payload: er.message });
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch({ type: "IS_CANCELLED" });
    };
  });
  return { ...loginState, loginAction };
}
