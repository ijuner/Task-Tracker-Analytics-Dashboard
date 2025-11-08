import { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import TaskCard from "../components/TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  completed_at?: string;
}

const Tasks = () => {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [creating, setCreating] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  const fetchTasks = async () => {
    try {
      const params: any = { limit, offset };
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      if (searchTerm) params.search = searchTerm;

      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token, filterStatus, filterPriority, searchTerm, offset]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post(
        "/tasks",
        { title, description, status, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      fetchTasks();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await api.patch(
        `/tasks/${id}`,
        { status: completed ? "done" : "todo" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      setError("Failed to update task status");
    }
  };

  const handleUpdate = async (id: number, updates: Partial<Task>) => {
    try {
      await api.patch(`/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  if (loading) return <p className="p-4">Loading tasks...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleCreate} className="mb-6 space-y-3">
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
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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

      <div className="mb-4 flex gap-4">
        <select
          value={filterStatus ?? ""}
          onChange={(e) =>
            setFilterStatus(e.target.value === "" ? null : e.target.value)
          }
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={filterPriority ?? ""}
          onChange={(e) =>
            setFilterPriority(e.target.value === "" ? null : e.target.value)
          }
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOffset(0);
          }}
          className="p-2 border rounded flex-1"
        />
      </div>

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
