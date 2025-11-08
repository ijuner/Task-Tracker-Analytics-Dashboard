interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  created_at: string;
}

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const [editing, setEditing] = useState(false);
const [editTitle, setEditTitle] = useState(task.title);
const [editDescription, setEditDescription] = useState(task.description);
const [editStatus, setEditStatus] = useState(task.status);


const TaskCard = ({ task, onDelete, onToggleComplete }: Props) => {
  return (
    <li className="border p-4 rounded shadow-sm relative">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm mt-1">
        Status: <span className="font-medium">{task.status}</span> |{" "}
        {task.completed ? "✅ Completed" : "⏳ Incomplete"}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Created: {new Date(task.created_at).toLocaleString()}
      </p>

      <button
        onClick={() => onToggleComplete(task.id, !task.completed)}
        className="mt-2 text-sm text-blue-500 hover:underline"
      >
        {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
      >
        Delete
      </button>

        <button
        onClick={() => setEditing(true)}
        className="absolute top-2 right-16 text-sm text-blue-500 hover:underline"
        >
        Edit
        </button>

    {editing ? (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onUpdate(task.id, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });
      setEditing(false);
    }}
    className="space-y-2"
  >
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
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
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
 
)}



    </li>
  );
};

export default TaskCard;
