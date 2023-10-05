import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import HouseDetails from "./components/HouseDetails";
import CreateHouse from "./components/CreateHouse";
import UpdateHouse from "./components/UpdateHouse";
import DeleteHouse from "./components/DeleteHouse";
import UserDashboard from "./components/UserDashboard";
import AgentDashboard from "./components/AgentDashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/create" element={authenticated ? <CreateHouse /> : <Navigate to="/signin" />} />
        <Route path="/update" element={authenticated ? <UpdateHouse /> : <Navigate to="/signin" />} />
        <Route path="/delete" element={authenticated ? <DeleteHouse /> : <Navigate to="/signin" />} />
        <Route path="/users/:id" element={authenticated ? <UserDashboard /> : <Navigate to="/signin" />} />
        <Route path="/agents/:id" element={authenticated ? <AgentDashboard /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn setAuthenticated={setAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
