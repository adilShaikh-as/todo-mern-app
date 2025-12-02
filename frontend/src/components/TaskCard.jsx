/* eslint-disable react/prop-types */
function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg shadow-slate-950/50">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-base md:text-lg">
            {task.isCompleted ? (
              <span className="line-through text-slate-400">{task.title}</span>
            ) : (
              task.title
            )}
          </h3>
          {task.description && (
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {task.description}
            </p>
          )}
        </div>
        <span
          className={`
            text-[10px] px-2 py-1 rounded-full uppercase tracking-wide
            ${
              task.priority === "high"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : task.priority === "low"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }
          `}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>
          Created: {new Date(task.createdAt).toLocaleDateString("en-IN")}
        </span>
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString("en-IN")}</span>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-1">
        <button
          onClick={onToggleComplete}
          className={`px-3 py-1.5 rounded-xl text-xs md:text-sm border transition
          ${
            task.isCompleted
              ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
              : "border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
          }`}
        >
          {task.isCompleted ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          onClick={onEdit}
          className="px-3 py-1.5 rounded-xl text-xs md:text-sm border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 rounded-xl text-xs md:text-sm border border-red-600/60 text-red-300 hover:bg-red-600/10"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
