// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Use the same token key as in your Login component ('authToken')
//   const accessToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!accessToken) { 
//       // Redirect to onboarding, pass current location so user can be redirected back after login
//       navigate("/onboarding", { replace: true, state: { from: location } });
//     }
//   }, [accessToken, navigate, location]);

//   if (!accessToken) return null; // Don't render children if no token

//   return <>{children}</>;
// }

// export default ProtectedRoute;
 