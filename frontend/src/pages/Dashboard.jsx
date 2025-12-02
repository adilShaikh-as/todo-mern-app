import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  const pending = total - completed;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Overview of your tasks and productivity.
          </p>
        </div>
        <button
          onClick={() => navigate("/tasks")}
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium"
        >
          Go to All Tasks
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Total Tasks</p>
          <p className="text-2xl font-semibold mt-1">{total}</p>
        </div>
        <div className="bg-slate-900/80 border border-emerald-600/40 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Completed</p>
          <p className="text-2xl font-semibold mt-1 text-emerald-400">
            {completed}
          </p>
        </div>
        <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Pending</p>
          <p className="text-2xl font-semibold mt-1 text-amber-300">
            {pending}
          </p>
        </div>
      </div>

      {/* Recent tasks */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>
        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-slate-500 text-sm">
            No tasks yet. Start by adding one from the All Tasks page.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.slice(0, 6).map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
