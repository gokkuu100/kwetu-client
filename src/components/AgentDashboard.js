import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AgentDashboard() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch agent details based on ID from the API endpoint
    fetch(`http://127.0.0.1:5000/agents/${id}`) // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setAgent(data);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
      });
  }, [id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="agent-dashboard">
      <h2>Agent Details</h2>
      <p>Name: {agent.name}</p>
      <p>Email: {agent.email}</p>
      <p>Phone Number: {agent.phonebook}</p>
      {/* Display other agent details as needed */}
    </div>
  );
}

export default AgentDashboard;
