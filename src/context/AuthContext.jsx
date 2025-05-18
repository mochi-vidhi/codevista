// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../components/loginScreen/firebase"; // Adjust path accordingly

import { onAuthStateChanged } from 'firebase/auth';

// Create a Context for Authentication
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Listen for changes in authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
