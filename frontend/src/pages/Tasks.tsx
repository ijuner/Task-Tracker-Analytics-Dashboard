import { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import TaskCard from "../components/TaskCard";


const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("pending");
const [creating, setCreating] = useState(false);
const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [filterStatus, setFilterStatus] = useState<string | null>(null);

const [searchTerm, setSearchTerm] = useState("");
const [limit] = useState(5);
const [offset, setOffset] = useState(0);


interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  created_at: string;
}

const handleDelete = async (id: number) => {
  try {
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    setError("Failed to delete task");
  }
};

const handleToggleComplete = async (id: number, completed: boolean) => {
  try {
    await api.patch(`/tasks/${id}`, { completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
      params: filterStatus ? { status: filterStatus } : {},
    });
    setTasks(response.data);
  } catch (err) {
    setError("Failed to update task status");
  }
};

const handleUpdate = async (id: number, updates: Partial<Task>) => {
  try {
    await api.patch(`/tasks/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks(); // 自动刷新
  } catch (err) {
    setError("Failed to update task");
  }
};

const Tasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchTasks = async () => {
try {
    const params: any = {
      limit,
      offset,
    };
    if (filterStatus) params.status = filterStatus;
    if (searchTerm) params.search = searchTerm;

    const response = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    setTasks(response.data);
  } catch (err: any) {
    setError("Failed to load tasks");
  } finally {
    setLoading(false);
  }
  };

    fetchTasks();
  }, [token, filterStatus, searchTerm, offset, limit]);

  if (loading) return <p className="p-4">Loading tasks...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">

      <form
  onSubmit={async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post(
        "/tasks",
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setStatus("pending");
      // Refresh task list
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setCreating(false);
    }
  }}
  className="mb-6 space-y-3"
>
  <h2 className="text-xl font-semibold">Create New Task</h2>
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="w-full p-2 border rounded"
  />
  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full p-2 border rounded"
  />
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="pending">Pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
  <button
    type="submit"
    disabled={creating}
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    {creating ? "Creating..." : "Create Task"}
  </button>
</form>

    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <LogoutButton />
    </div>


    <div className="mb-4 flex items-center gap-4">
      <label className="font-medium">Filter by status:</label>
      <select
        value={filterStatus ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setFilterStatus(value === "" ? null : value);
        }}
        className="p-2 border rounded"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setOffset(0); // reset to first page
        }}
        className="p-2 border rounded w-64"
      />
    </div>



      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
     <ul className="space-y-4">
  {tasks.map((task) => (
    <TaskCard
  key={task.id}
  task={task}
  onDelete={handleDelete}
  onToggleComplete={handleToggleComplete}
  onUpdate={handleUpdate}
/>
  ))}
</ul>
      )}


  <div className="flex justify-between mt-6">
    <button
      onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
      disabled={offset === 0}
      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <button
      onClick={() => setOffset((prev) => prev + limit)}
      className="px-4 py-2 bg-gray-200 rounded"
    >
      Next
    </button>
  </div>



    </div>
  );
};

export default Tasks;
