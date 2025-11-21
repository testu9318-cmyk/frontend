import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import QueueMonitor from '../src/lib/QueueMonitor.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/queue-monitor" element={<QueueMonitor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
