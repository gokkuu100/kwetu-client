import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Fetch houses data from API endpoint
    fetch("http://127.0.0.1:5000/houses") // Update the API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHouses(data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="home">
      <nav>
        <ul>
          <li>
            <Link to="/create">Create House</Link>
          </li>
          <li>
            <Link to="/update">Update House</Link>
          </li>
          <li>
            <Link to="/delete">Delete House</Link>
          </li>
          {/* Add more links to other routes if needed */}
        </ul>
      </nav>
      <h1>House Listings</h1>
      <div className="house-list">
        {houses.map((house) => (
          <Link key={house.id} to={`/house/${house.id}`} className="house-card">
            <h2>{house.title}</h2>
            <p>Price: ${house.price}</p>
            <p>Size: {house.size} sqft</p>
            <p>County: {house.county}</p>
            <img src={house.image_paths} alt={house.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
