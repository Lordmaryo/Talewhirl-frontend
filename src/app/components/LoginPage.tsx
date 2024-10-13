"use client";
import { useState } from "react";
import axios from "axios";
import baseApi from "../api/baseApi";


/**
 * TASKS FOR TODAY!!
 * 
 * TODO - style the login page with an image on the left and the form on the right 
 * TODO - handle and display errors in the login page
 */

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await baseApi.post("auth/Authenticate", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-white max-w-[600px] text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
