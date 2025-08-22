import { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userPoint, setUserPoint] = useState(null);

  useEffect(() => { 
    try {
      const user = localStorage.getItem("userDetails");
      if (user) {
        setUserDetails(JSON.parse(user));
      }
      const balance = localStorage.getItem("userBalance");
        if (balance) {
          setUserBalance(parseFloat(balance));
        }

        const point = localStorage.getItem("userPoint");
        if (point) {
          setUserPoint(parseFloat(point));
        }
    } catch (e) {
      console.log("Error fetching userDetails:", e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, setUserBalance, userBalance, setUserPoint, userPoint }}>
      {children}
    </AuthContext.Provider>
  );
};
