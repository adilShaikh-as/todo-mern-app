// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / Title */}
        <div className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">Task</span>
          <span className="text-slate-100">Manager</span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-2 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition 
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition 
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            All Tasks
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition 
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            Completed
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
