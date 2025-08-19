import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("authToken");

  const inactivityTimeout = useRef(null);

  // logout for inactivity
  const handleInactivityLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  // reset inactivity timer
  const resetTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    // 5 minutes inactivity (300000 ms)
    inactivityTimeout.current = setTimeout(handleInactivityLogout, 15 * 60 * 1000);
  };

  useEffect(() => {
    // No token at all → go to onboarding
    if (!accessToken) {
      navigate("/onboarding", { replace: true, state: { from: location } });
      return;
    }

    // Listen for activity only if token exists
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start timer

    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [accessToken, navigate, location]);

  if (!accessToken) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
