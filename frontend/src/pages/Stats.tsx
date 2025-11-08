import { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatsResponse {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
}

const Stats = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to load stats");
      }
    };

    fetchStats();
  }, [token]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!stats) return <p className="p-4">Loading stats...</p>;

  const pieData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [
          stats.completed_tasks,
          stats.pending_tasks,
          stats.in_progress_tasks,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#3B82F6"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Statistics</h1>
      <p className="mb-2">Total Tasks: {stats.total_tasks}</p>
      <p className="mb-6">
        Completion Rate:{" "}
        {((stats.completed_tasks / stats.total_tasks) * 100).toFixed(1)}%
      </p>
      <div className="max-w-sm">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Stats;
