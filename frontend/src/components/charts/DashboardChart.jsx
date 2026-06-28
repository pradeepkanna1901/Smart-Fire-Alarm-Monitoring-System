import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardChart({
  sensors,
  alerts,
  incidents,
}) {
  const data = {
    labels: ["Sensors", "Alerts", "Incidents"],
    datasets: [
      {
        label: "Fire Alarm Statistics",
        data: [sensors, alerts, incidents],
        backgroundColor: [
          "#2563eb",
          "#dc2626",
          "#f97316",
        ],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Critical", "Medium", "Low"],
    datasets: [
      {
        data: [1, 1, 1],
        backgroundColor: [
          "#dc2626",
          "#f59e0b",
          "#16a34a",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        marginTop: "40px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: 2,
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        }}
      >
        <h2>📊 System Analytics</h2>

        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        }}
      >
        <h2>🥧 Alert Severity</h2>

        <Pie data={pieData} />
      </div>
    </div>
  );
}