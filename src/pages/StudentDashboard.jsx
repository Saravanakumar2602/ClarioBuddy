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
import "../styles/StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div className="dashboard student-dashboard">
      <h2>Student Dashboard</h2>

      <AnnouncementSection />
      <TimetableSection />
      <LostFoundSection />
      <ComplaintsSection />
      <SkillExchange />
      <TechFeed />
      <PollsSection /> {/* Student view, voting only */}

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
