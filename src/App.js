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
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/settings/:user" element={<Settings />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
