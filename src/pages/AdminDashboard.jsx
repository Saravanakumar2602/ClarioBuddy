import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AnnouncementSection from "./components/AnnouncementSection";
import LostFoundSection from "./components/LostFoundSection";
import TimetableSection from "./components/TimetableSection";
import ComplaintsSection from "./components/ComplaintsSection";
import SkillExchange from "./components/SkillExchange";
import TechFeed from "./components/TechFeed";
import PollsSection from "./components/PollsSection";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div className="dashboard admin-dashboard">
      <h2>Admin Dashboard</h2>

      <AnnouncementSection isAdmin />
      <TimetableSection isAdmin />
      <LostFoundSection isAdmin />
      <ComplaintsSection isAdmin />
      <SkillExchange isAdmin />
      <TechFeed isAdmin />
      <PollsSection isAdmin /> {/* Admin can create polls */}

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
