import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function TimetableSection({ isAdmin }) {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "timetable"), (snapshot) => {
      setSchedule(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const addEntry = async () => {
    if (day && subject && time) {
      await addDoc(collection(db, "timetable"), { day, subject, time });
      setDay(""); setSubject(""); setTime("");
    }
  };

  const deleteEntry = async (id) => {
    await deleteDoc(doc(db, "timetable", id));
  };

  return (
    <div className="section">
      <h3>🗓 Timetable</h3>
      {isAdmin && (
        <div className="form">
          <input value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
          <button onClick={addEntry}>Add</button>
        </div>
      )}
      <ul>
        {schedule.map(({ id, day, subject, time }) => (
          <li key={id}>
            {day} - {subject} at {time}
            {isAdmin && <button onClick={() => deleteEntry(id)}>❌</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
