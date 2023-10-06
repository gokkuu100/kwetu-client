import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function AgentDashboard() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/agents/${id}`) 
      .then((response) => response.json())
      .then((data) => {
        setAgent(data);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
      });
  }, [id]);

  const handleLogout = () => {
    // clears storgae 
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/signin"); 
  };


  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="agent-dashboard">
        <div className="dashboard-links">
        <Link to="/home">Home</Link>
        <Link to="/createhouse">Create House</Link>
        <Link to="/updatehouse">Update House</Link>
        <Link to="/deletehouse">Delete House</Link>
        <Link to={`/agents/${id}`}>Agent Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Agent Details</h2>
      <p>Name: {agent.name}</p>
      <p>Email: {agent.email}</p>
      <p>Phone Number: {agent.phonebook}</p>
      
      {/* Links to other pages */}

      {/* Display other agent details as needed */}
    </div>
  );
}

export default AgentDashboard;
