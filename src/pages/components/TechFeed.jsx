import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import "../../styles/Section.css";

const TechFeed = ({ isAdmin }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [feeds, setFeeds] = useState([]);

  const fetchFeeds = async () => {
    const q = query(collection(db, "techFeeds"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    setFeeds(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !link) return;

    await addDoc(collection(db, "techFeeds"), {
      title,
      link,
      timestamp: serverTimestamp(),
    });

    setTitle("");
    setLink("");
    fetchFeeds();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "techFeeds", id));
    fetchFeeds();
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="section">
      <h3>📰 Tech News & Opportunities Feed</h3>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Title (e.g. Hackathon - July)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="Link (e.g. https://event.com)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit">Add Opportunity</button>
        </form>
      )}

      <div className="card-list">
        {feeds.map((feed) => (
          <div key={feed.id} className="card">
            <h4>{feed.title}</h4>
            <a href={feed.link} target="_blank" rel="noopener noreferrer">
              {feed.link}
            </a>
            {isAdmin && (
              <button className="delete-btn" onClick={() => handleDelete(feed.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechFeed;
