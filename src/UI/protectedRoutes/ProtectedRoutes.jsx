import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");

    // if (!accessToken) {
      // If not authenticated, redirect to onboarding
      navigate("/onboarding",
        //  { state: { from: location } }
        );
    // }
  }, [navigate, location]);

  const accessToken = localStorage.getItem("accessToken");

  // If authenticated, render children
  if (accessToken) return <>{children}</>;

  // Otherwise, nothing (or a loader) while redirecting
  return null;
}

export default ProtectedRoute;
