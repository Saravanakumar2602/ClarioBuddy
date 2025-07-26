import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../../styles/Section.css";

const SkillExchange = ({ isAdmin }) => {
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const snapshot = await getDocs(collection(db, "skills"));
    setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (!skillName || !skillDescription) return;

    await addDoc(collection(db, "skills"), {
      name: skillName,
      description: skillDescription,
      timestamp: new Date(),
    });

    setSkillName("");
    setSkillDescription("");
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "skills", id));
    fetchSkills();
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="section">
      <h3>🎓 Skill Exchange</h3>

      {!isAdmin && (
        <form onSubmit={handleSkillSubmit} className="form">
          <input
            type="text"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
          <textarea
            placeholder="Description / Availability"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
          ></textarea>
          <button type="submit">List My Skill</button>
        </form>
      )}

      <div className="card-list">
        {skills.map((skill) => (
          <div key={skill.id} className="card">
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
            {!isAdmin && (
              <button className="delete-btn" onClick={() => handleDelete(skill.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillExchange;
