import { useEffect, useState } from "react";
import { getTasks, toggleComplete, deleteTask } from "../api/taskApi";
import TaskCard from "../components/TaskCard";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks("completed");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching completed tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id) => {
    try {
      await toggleComplete(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Completed Tasks</h1>
        <p className="text-slate-400 text-sm">
          All the tasks you have completed.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No completed tasks yet. Finish some tasks to see them here.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task._id)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;
