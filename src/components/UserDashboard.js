import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details based on ID from the API endpoint
    fetch(`http://127.0.0.1:5000/${id}`) // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Phone Number: {user.phonebook}</p>
      {/* Display other user details as needed */}
    </div>
  );
}

export default UserDashboard;
