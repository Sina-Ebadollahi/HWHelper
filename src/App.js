// styles
import "./App.css";
// Route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Notfound from "./pages/Notfound/Notfound";
import Create from "./pages/Create/Create";
import Project from "./pages/project/Project";
import Settings from "./pages/Settings/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
// hooks
import useAuth from "./hooks/useAuth";
import UsersList from "./components/UsersList/UsersList";
function App() {
  const { user, authIsReady } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              {/* TODO */}
              <Route exact path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/create" element={<Create />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/settings/:user" element={<Settings />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
          {user && <UsersList />}
        </Router>
      )}
    </div>
  );
}

export default App;
