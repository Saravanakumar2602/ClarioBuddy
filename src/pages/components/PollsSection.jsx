import React, { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../../styles/Section.css";

const PollsSection = ({ isAdmin }) => {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
  const [votedPolls, setVotedPolls] = useState([]);
  const user = getAuth().currentUser;

  const fetchPolls = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "polls"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPolls(data);

    const voted = JSON.parse(localStorage.getItem(`voted_${user?.uid}`)) || [];
    setVotedPolls(voted);
  }, [user?.uid]);

  const handleVote = async (pollId, optionIndex) => {
    if (votedPolls.includes(pollId)) {
      alert("You have already voted on this poll.");
      return;
    }

    const pollRef = doc(db, "polls", pollId);
    const selectedPoll = polls.find((poll) => poll.id === pollId);
    const updatedVotes = [...selectedPoll.votes];
    updatedVotes[optionIndex] += 1;

    await updateDoc(pollRef, { votes: updatedVotes });

    const updatedVoted = [...votedPolls, pollId];
    setVotedPolls(updatedVoted);
    localStorage.setItem(`voted_${user?.uid}`, JSON.stringify(updatedVoted));
    fetchPolls();
  };

  const createPoll = async (e) => {
    e.preventDefault();
    const validOptions = newPoll.options.filter((opt) => opt.trim() !== "");
    if (!newPoll.question || validOptions.length < 2) return;

    await addDoc(collection(db, "polls"), {
      question: newPoll.question,
      options: validOptions,
      votes: Array(validOptions.length).fill(0),
      timestamp: serverTimestamp(),
    });

    setNewPoll({ question: "", options: ["", ""] });
    fetchPolls();
  };

  const deletePoll = async (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      await deleteDoc(doc(db, "polls", pollId));
      fetchPolls();
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return (
    <div className="section">
      <h3>🗳️ Polls & Feedback</h3>

      {isAdmin && (
        <form onSubmit={createPoll} className="form">
          <input
            type="text"
            placeholder="Enter Poll Question"
            value={newPoll.question}
            onChange={(e) =>
              setNewPoll({ ...newPoll, question: e.target.value })
            }
          />
          {newPoll.options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => {
                const updated = [...newPoll.options];
                updated[index] = e.target.value;
                setNewPoll({ ...newPoll, options: updated });
              }}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setNewPoll({ ...newPoll, options: [...newPoll.options, ""] })
            }
          >
            ➕ Add Option
          </button>
          <button type="submit">Create Poll</button>
        </form>
      )}

      <div className="card-list">
        {polls.map((poll) => (
          <div key={poll.id} className="card">
            <h4>{poll.question}</h4>
            {poll.options.map((option, i) => (
              <div key={i}>
                <button
                  onClick={() => handleVote(poll.id, i)}
                  disabled={votedPolls.includes(poll.id)}
                >
                  {option}
                </button>
                <span> - {poll.votes[i]} votes</span>
              </div>
            ))}
            {isAdmin && (
              <button
                className="delete-btn"
                onClick={() => deletePoll(poll.id)}
              >
                🗑️ Delete Poll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsSection;
