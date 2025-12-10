import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/client";
export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        navigate("/login");
      } else {
        setAllowed(true);
      }

      setLoading(false);
    }

    verify();
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return allowed ? children : null;
}
