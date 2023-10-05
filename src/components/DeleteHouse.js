import React, { useState } from "react";

function DeleteHouse() {
  const [houseId, setHouseId] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();

    // Perform delete request with houseId
    fetch(`http://127.0.0.1:5000/houses/${houseId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("House deleted successfully");
          alert("House deleted from the database");
          // Optionally, perform any additional actions after successful delete
        } else {
          console.error("Error deleting house");
          alert("Error deleting the house");
        }
      })
      .catch((error) => {
        console.error("Error deleting house:", error);
        alert("Error deleting the house");
      });
  };

  return (
    <div className="delete-house">
      <h2>Delete House</h2>
      <form onSubmit={handleDelete}>
        <label>House ID:</label>
        <input
          type="number"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeleteHouse;
