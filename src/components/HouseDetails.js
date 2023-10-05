import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./HouseDetails.css"; // Import your CSS file for styling

function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch house details based on ID from the API endpoint
    fetch(`http://127.0.0.1:5000/houses/${id}`) // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setHouse(data);
        // Fetch agent details based on agent_id from the house data
        fetch(`http://127.0.0.1:5000/agents/${data.agent_id}`)
          .then((response) => response.json())
          .then((agentData) => {
            setAgent(agentData);
          })
          .catch((error) => {
            console.error("Error fetching agent details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching house details:", error);
      });
  }, [id]);

  if (!house || !agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="house-details-container">
      <div className="house-details-text">
        <h2>{house.title}</h2>
        <p>Price: ${house.price}</p>
        <p>Size: {house.size} sqft</p>
        <p>County: {house.county}</p>
        <p>Description: {house.description}</p>
        <p>Area: {house.city}</p>
        <p>Bedroom: {house.bedrooms}</p>
        <p>Bathrooms: {house.bathrooms}</p>
        {/* Display other house details as needed */}
        
        <h2>Agent Details</h2>
        <p>Name: {agent.name}</p>
        <p>Email: {agent.email}</p>
        <p>Phone: {agent.phonebook}</p>
      </div>
      <div className="house-details-image">
        <img src={house.image_paths} alt={house.title} />
      </div>
    </div>
  );
}

export default HouseDetails;
