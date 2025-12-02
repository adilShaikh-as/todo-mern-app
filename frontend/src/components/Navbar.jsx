import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">Task</span>
          <span className="text-slate-100">Manager</span>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          {isAuthenticated && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition ${
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
                  `px-3 py-1.5 rounded-full transition ${
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
                  `px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                Completed
              </NavLink>
            </>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full border border-slate-700 text-xs hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-full text-xs border border-slate-700 hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-full text-xs bg-indigo-500 hover:bg-indigo-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
