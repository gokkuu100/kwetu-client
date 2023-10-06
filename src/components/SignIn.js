import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignUp from "./SignUp";

const SignIn = ({ setAuthenticated, setUserRole }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
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
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("id", data.id);

                    document.cookie = `access_token=${data.access_token}; path=/`;
                    console.log("Received token:", data.access_token);
                    console.log("Cookies:", document.cookie);

                    // setUserRole(data.role);
                    // setAuthenticated(true);

                    if (data.role === 'user') {
                        navigate(`/users/${data.id}`);
                    } else if (data.role === 'agent') {
                        navigate(`/agents/${data.id}`);
                    } else {
                        console.error("Invalid role");
                    }
                } else {
                    console.error("Invalid credentials");
                }
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
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default SignIn;
