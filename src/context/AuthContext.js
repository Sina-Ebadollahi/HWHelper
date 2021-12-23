import { createContext, useEffect, useReducer } from "react";
import { firebaseAuth } from "../firebase/config";
export const AuthContext = createContext();
let authInitializing = {
  user: null,
  authIsReady: false,
};
const authReducer = (state, action) => {
  switch (action.payload) {
    case "LOGOUT":
      return {
        authIsReady: false,
        user: null,
      };
    case "LOGIN":
      return {
        authIsReady: true,
        user: action.payload,
      };
    case "AUTH_IS_READY":
      return {
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};
export function AuthContextProvider({ children }) {
  const [authResponse, dispatch] = useReducer(authReducer, authInitializing);

  useEffect(() => {
    const unsubFromFirebaseAuth = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "AUTH_IS_READY", payload: user });
        unsubFromFirebaseAuth();
        console.log(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authResponse, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
