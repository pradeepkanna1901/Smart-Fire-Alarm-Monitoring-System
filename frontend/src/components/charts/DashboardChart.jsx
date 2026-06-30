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

  const temperatureData = {
    labels: [
      "Sensor 1",
      "Sensor 2",
      "Sensor 3",
      "Sensor 4",
      "Sensor 5",
    ],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [42, 55, 38, 67, 48],
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
    ],
  };

  const smokeData = {
    labels: [
      "Sensor 1",
      "Sensor 2",
      "Sensor 3",
      "Sensor 4",
      "Sensor 5",
    ],
    datasets: [
      {
        label: "Smoke Level",
        data: [120, 300, 180, 450, 220],
        backgroundColor: "#3b82f6",
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
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

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,.12)",
          }}
        >
          <h2>🌡 Temperature Analysis</h2>

          <Bar
            data={temperatureData}
            options={{
              responsive: true,
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,.12)",
          }}
        >
          <h2>💨 Smoke Level Analysis</h2>

          <Bar
            data={smokeData}
            options={{
              responsive: true,
            }}
          />
        </div>
      </div>
    </>
  );
}