import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const RoleRoute = ({ role, children }) => {
  const [user] = useAuthState(auth);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().role === role) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    };

    if (user) fetchRole();
  }, [user]);

  if (allowed === null) return <p>Checking permissions...</p>;
  return allowed ? children : <Navigate to="/" />;
};

export default RoleRoute;
