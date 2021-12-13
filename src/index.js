import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// context
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider children={<App />} />
  </React.StrictMode>,
  document.getElementById("root")
);
