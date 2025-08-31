import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("authToken");

  const inactivityTimeout = useRef(null);

  const handleInactivityLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  const resetTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(handleInactivityLogout, 15 * 60 * 1000);
  };

  useEffect(() => {
    // redirect if no token
    if (!accessToken) {
      navigate("/homepage", { replace: true, state: { from: location } });
      return;
    }

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
   }, [accessToken]);

  if (!accessToken) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
