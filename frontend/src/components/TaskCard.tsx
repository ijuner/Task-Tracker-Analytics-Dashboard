import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  completed_at?: string;
}

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  onUpdate: (id: number, updates: Partial<Task>) => void;
}

const TaskCard = ({ task, onDelete, onToggleComplete, onUpdate }: Props) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      priority: editPriority,
    });
    setEditing(false);
  };

  return (
    <li className="border p-4 rounded shadow-sm relative">
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm mt-1">
            Status: <span className="font-medium">{task.status}</span> |{" "}
            Priority: <span className="font-medium">{task.priority}</span>
          </p>
          <p className="text-xs text-gray-500">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            Completed:{" "}
            {task.completed_at
              ? new Date(task.completed_at).toLocaleString()
              : "Not completed"}
          </p>

          <button
            onClick={() => onToggleComplete(task.id, task.status !== "done")}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            {task.status === "done" ? "Mark as Incomplete" : "Mark as Done"}
          </button>

          <button
            onClick={() => setEditing(true)}
            className="absolute top-2 right-16 text-sm text-blue-500 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TaskCard;