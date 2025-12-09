import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import QueueMonitor from '../src/lib/QueueMonitor.jsx';
import './App.css';
import LoginForm from "./Components/LoginForm.js";
import RegisterForm from "./Components/RegisterForm.js";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PROTECTED ROUTE */}
        <Route
          path="/"
          element={
              <HomePage />
          }
        />

        {/* PROTECTED ROUTE */}
        <Route
          path="/queue-monitor"
          element={
            <ProtectedRoute>
              <QueueMonitor />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
