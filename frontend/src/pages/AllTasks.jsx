import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  toggleComplete,
  deleteTask,
} from "../api/taskApi";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let statusParam;
      if (filter === "completed") statusParam = "completed";
      else if (filter === "pending") statusParam = "pending";

      const res = await getTasks(statusParam);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      setModalOpen(false);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateTask(editingTask._id, data);
      setEditingTask(null);
      setModalOpen(false);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleComplete(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task status");
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

  const openAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const onSubmitModal = (formData) => {
    if (editingTask) handleUpdate(formData);
    else handleCreate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">All Tasks</h1>
          <p className="text-slate-400 text-sm">
            Manage all your tasks in one place.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium shadow-lg shadow-indigo-500/30"
        >
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 text-xs md:text-sm">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full border transition ${
              filter === f
                ? "bg-indigo-500 text-white border-indigo-500"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <p className="text-slate-400">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-500 text-sm">No tasks found. Add one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task._id)}
              onEdit={() => openEditModal(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      )}

      <TaskFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={onSubmitModal}
        initialData={editingTask}
      />
    </div>
  );
}

export default AllTasks;
