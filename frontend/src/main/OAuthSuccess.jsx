import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally fetch user info using cookie auth
    navigate("/");
  }, []);

  return <div>Logging in...</div>;
}
