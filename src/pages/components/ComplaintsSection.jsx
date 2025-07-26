import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export default function ComplaintsSection({ isAdmin }) {
  const [complaint, setComplaint] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "complaints"), (snapshot) => {
      setComplaints(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const submitComplaint = async () => {
    if (complaint) {
      await addDoc(collection(db, "complaints"), {
        student: auth.currentUser.displayName,
        complaint,
        timestamp: serverTimestamp(),
      });
      setComplaint("");
    }
  };

  const deleteComplaint = async (id) => {
    await deleteDoc(doc(db, "complaints", id));
  };

  return (
    <div className="section">
      <h3>📝 Complaints</h3>
      {!isAdmin && (
        <div className="form">
          <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Enter complaint..." />
          <button onClick={submitComplaint}>Submit</button>
        </div>
      )}
      <ul>
        {complaints.map(({ id, complaint, student }) => (
          <li key={id}>
            {complaint} <i>- {student}</i>
            {isAdmin && <button onClick={() => deleteComplaint(id)}>❌</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
