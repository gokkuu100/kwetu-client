import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        console.log(data.access_token)

        // Parse the JWT token to get the user role
        const decodedToken = JSON.parse(atob(data.access_token.split(".")[1]));
        const userRole = decodedToken.sub.role;
        const agentId = decodedToken.sub.agent_id;

        console.log("UserRole", userRole)
        console.log("AgentID", agentId);
        // Check user role and redirect accordingly
        if (userRole === "agent") {
          // Redirect to agent dashboard
          navigate(`/agents/${decodedToken.sub.agent_id}/dashboard`);
        } else if (userRole === "user") {
          // Redirect to user dashboard
          navigate(`/users/${decodedToken.sub.user_id}/dashboard`);
        } else {
          // Handle other roles if necessary
          console.error("Invalid user role");
        }

        setAuthenticated(true);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error occurred during sign in", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
