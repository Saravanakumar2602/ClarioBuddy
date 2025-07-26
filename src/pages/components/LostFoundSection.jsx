import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase";

export default function LostFoundSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "lost_found"), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const addItem = async () => {
    if (item && desc) {
      await addDoc(collection(db, "lost_found"), {
        item,
        description: desc,
        owner: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
      });
      setItem("");
      setDesc("");
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "lost_found", id));
  };

  return (
    <div className="section">
      <h3>📦 Lost & Found</h3>
      {!isAdmin && (
        <div className="form">
          <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
          <button onClick={addItem}>Add</button>
        </div>
      )}
      <ul>
        {items.map(({ id, item, description, owner }) => (
          <li key={id}>
            <strong>{item}</strong>: {description} <i>({owner})</i>
            {isAdmin && <button onClick={() => deleteItem(id)}>❌</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
