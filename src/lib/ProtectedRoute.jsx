import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // read session cookie
  const sessionId = Cookies.get("connect.sid");

  // if no session cookie → redirect to login
  if (!sessionId) {
    return <Navigate to="/login" replace />;
  }

  // if session exists → allow page access
  return children;
}
