import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import "./dashboard.css";
import StatCard from "./StatCard";

function DashboardContent() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await adminApi.get("/dashboard");

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <main className="dashboard-content">
      <h1>Admin Dashboard</h1>

      <p>Welcome to the Elite Devices management system.</p>

      <div className="stat-cards">
        <StatCard title="Products" value={stats.totalProducts} />
        <StatCard title="Orders" value={stats.totalOrders} />
        <StatCard title="Revenue" value="Coming Soon" />
        <StatCard title="Customers" value="Coming Soon" />
      </div>
    </main>
  );
}

export default DashboardContent;