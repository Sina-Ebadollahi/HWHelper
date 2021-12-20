import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const AuthContextProps = useContext(AuthContext);
  if (AuthContext === undefined) {
    throw new Error("useAuth() need to be used inside App.js field.");
  }
  return AuthContextProps;
}
