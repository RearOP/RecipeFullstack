import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const API_URL = "http://localhost:3000";
  useEffect(() => {
    axios
      .get("${API_URL}/check", { withCredentials: true })
      .then((res) => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null; // or loading indicator

  return isAuth ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
