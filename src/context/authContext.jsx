import { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => { 
    try {
      const user = localStorage.getItem("userDetails");
      if (user) {
        setUserDetails(JSON.parse(user));
      }
    } catch (e) {
      console.log("Error fetching userDetails:", e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
