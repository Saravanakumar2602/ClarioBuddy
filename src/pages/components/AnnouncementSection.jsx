import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

export default function AnnouncementSection({ isAdmin }) {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const addAnnouncement = async () => {
    if (message.trim()) {
      await addDoc(collection(db, "announcements"), {
        message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    }
  };

  const deleteAnnouncement = async (id) => {
    await deleteDoc(doc(db, "announcements", id));
  };

  return (
    <div className="section">
      <h3>📢 Announcements</h3>
      {isAdmin && (
        <div className="form">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="New Announcement" />
          <button onClick={addAnnouncement}>Post</button>
        </div>
      )}
      <ul>
        {announcements.map(({ id, message }) => (
          <li key={id}>
            {message}
            {isAdmin && <button onClick={() => deleteAnnouncement(id)}>❌</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
