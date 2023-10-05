import React, { useState } from "react";

function CreateHouse() {
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setHouseData({ ...houseData, [name]: value });
//   };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image_paths") {
      // Handle image_paths as an array, adding the new link at index 0
      setHouseData({ ...houseData, [name]: [value, ...houseData.image_paths] });
    } else {
      setHouseData({ ...houseData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/houses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(houseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("House added successfully:", data);
        alert("House added to database");
      })
      .catch((error) => {
        console.error("Error adding house:", error);
      });
  };

  return (
    <div className="create-house">
      <h2>Create a New House Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label><br />
        <input
        type="text"
        name="title"
        value={houseData.title}
        onChange={handleInputChange}
        required
        /><br />
        <label>Bathrooms:</label><br />
        <input
        type="number"
        name="bathrooms"
        value={houseData.bathrooms}
        onChange={handleInputChange}
        required
        /><br />
        <label>Bedrooms:</label><br />
        <input
        type="number"
        name="bedrooms"
        value={houseData.bedrooms}
        onChange={handleInputChange}
        required
        /><br />
        <label>Area:</label><br />
        <input
        type="text"
        name="city"
        value={houseData.city}
        onChange={handleInputChange}
        required
        /><br />
        <label>County:</label><br />
        <input
        type="text"
        name="county"
        value={houseData.county}
        onChange={handleInputChange}
        required
        /><br />
        <label>Price:</label><br />
        <input
        type="number"
        name="price"
        value={houseData.price}
        onChange={handleInputChange}
        required
        /><br />
        <label>Size(sqfeet):</label><br />
        <input
        type="number"
        name="size"
        value={houseData.size}
        onChange={handleInputChange}
        required
        /><br />
        <label>Description:</label><br />
        <input
        type="text"
        name="description"
        value={houseData.description}
        onChange={handleInputChange}
        required
        /><br />
        <label>Images:</label><br />
        <input
        type="text"
        name="image_paths"
        value={houseData.image_paths[0]}
        onChange={handleInputChange}
        required
        /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateHouse;
