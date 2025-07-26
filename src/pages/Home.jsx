import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    signInWithPopup(auth, provider)
      .then(() => {
        role === "admin" ? navigate("/admin") : navigate("/student");
      })
      .catch((err) => console.error("Login Error", err));
  };

  return (
    <div className="home-container">
      <h1>ClarioBuddy</h1>
      <p>Your Centralized Student Utility Hub</p>
      <div className="login-buttons">
        <button onClick={() => handleLogin("admin")} className="admin-btn">Continue as Admin</button>
        <button onClick={() => handleLogin("student")} className="student-btn">Continue as Student</button>
      </div>
    </div>
  );
}
