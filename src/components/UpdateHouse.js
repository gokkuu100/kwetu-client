import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateHouse() {
  const { id } = useParams();
  const [houseId, setHouseId] = useState(id);
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [newValue, setNewValue] = useState("");
  const [houseData, setHouseData] = useState({
    title: "",
    size: 0,
    price: 0,
    description: "",
    city: "",
    county: "",
    bedrooms: 0,
    bathrooms: 0,
    image_paths: [],
  });

  useEffect(() => {
    // Fetch house details based on ID from the API endpoint
    fetch(`http://127.0.0.1:5000/houses/${id}`) // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setHouseData(data);
      })
      .catch((error) => {
        console.error("Error fetching house details:", error);
      });
  }, [id]);

  const handleUpdateField = (e) => {
    e.preventDefault();

    const updatedField = {
      [fieldToUpdate]: newValue
    };

    // Perform patch request to update a specific field in the house data
    fetch(`http://127.0.0.1:5000/${houseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedField),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Field updated successfully:", data);
        alert("Field updated in the database");
        // Optionally, update the state with the new data received from the API
      })
      .catch((error) => {
        console.error("Error updating field:", error);
      });
  };

  return (
    <div className="update-house">
      <h2>Update House Details</h2>
      <form onSubmit={handleUpdateField}>
        <label>House ID:</label>
        <input
          type="number"
          name="houseId"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
          required
        />
        <label>Field to Update:</label>
        <input
          type="text"
          name="fieldToUpdate"
          value={fieldToUpdate}
          onChange={(e) => setFieldToUpdate(e.target.value)}
          required
        />
        <label>New Value:</label>
        <input
          type="text"
          name="newValue"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          required
        />
        <button type="submit">Update Field</button>
      </form>
    </div>
  );
}

export default UpdateHouse;
