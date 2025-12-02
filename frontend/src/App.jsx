// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Top Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
