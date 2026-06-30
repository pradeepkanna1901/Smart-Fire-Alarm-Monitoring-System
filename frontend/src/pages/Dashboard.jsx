import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/charts/DashboardChart";
import { getDashboardData } from "../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalAlerts: 0,
    totalSensors: 0,
    totalIncidents: 0,
    systemStatus: "Loading...",
  });

  useEffect(() => {
  loadDashboard();

  const interval = setInterval(() => {
    loadDashboard();
  }, 5000); // Refresh every 5 seconds

  return () => clearInterval(interval);
}, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardData();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f4f6f9",
            minHeight: "100vh",
          }}
        >
          <Notification alerts={dashboard.totalAlerts} />

          <h1
  style={{
    fontSize: "42px",
    textAlign: "center",
    lineHeight: "1.2",
    marginBottom: "10px",
  }}
>
  🔥 Smart Fire Alarm Monitoring System
</h1>

          <p>Real-Time Monitoring Dashboard</p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <StatCard
              title="Active Alerts"
              value={dashboard.totalAlerts}
              color="#e53935"
            />

            <StatCard
              title="Sensors"
              value={dashboard.totalSensors}
              color="#1e88e5"
            />

            <StatCard
              title="Incidents"
              value={dashboard.totalIncidents}
              color="#fb8c00"
            />

            <StatCard
              title="System Status"
              value={dashboard.systemStatus}
              color="#43a047"
            />
          </div>

          <DashboardChart
            sensors={dashboard.totalSensors}
            alerts={dashboard.totalAlerts}
            incidents={dashboard.totalIncidents}
          />
        </div>
      </div>
    </>
  );
}