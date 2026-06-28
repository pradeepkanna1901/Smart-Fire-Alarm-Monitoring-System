import { useEffect, useState } from "react";
import {
  getAlerts,
  addAlert,
  updateAlert,
  deleteAlert,
} from "../services/alertService";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
  const [newAlert, setNewAlert] = useState({
    
  alertType: "",
  severity: "Low",
  location: "",
  status: "Active",
  time: "",
});

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await getAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdd = async () => {
    try {
        await addAlert(newAlert);

        alert("✅ Alert Added Successfully");

        setNewAlert({
            alertType: "",
            severity: "Low",
            location: "",
            status: "Active",
            time: "",
        });

        loadAlerts();
    } catch (error) {
        console.error(error);
        alert("❌ Failed to add alert");
    }
};
const handleEdit = (alert) => {
  setNewAlert({
    alertType: alert.alertType,
    severity: alert.severity,
    location: alert.location,
    status: alert.status,
    time: alert.time,
  });

  setEditingId(alert.id);
  setIsEditing(true);
};
const handleUpdate = async () => {
  try {
    await updateAlert(editingId, newAlert);

    alert("✅ Alert Updated Successfully!");

    setNewAlert({
      alertType: "",
      severity: "Low",
      location: "",
      status: "Active",
      time: "",
    });

    setEditingId(null);
    setIsEditing(false);

    loadAlerts();
  } catch (error) {
    console.error(error);
    alert("❌ Update Failed");
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this alert?")) return;

    try {
      await deleteAlert(id);
      alert("✅ Alert deleted successfully!");
      loadAlerts();
    } catch (error) {
      alert("❌ Delete failed");
    }
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.alertType.toLowerCase().includes(search.toLowerCase()) ||
      alert.location.toLowerCase().includes(search.toLowerCase()) ||
      alert.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h1>🚨 Alert Management</h1>

        <input
          type="text"
          placeholder="🔍 Search Alert..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "280px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,.15)",
  }}
>
  <h2 style={{ marginBottom: "15px" }}>➕ Add New Alert</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
    }}
  >
    <input
      type="text"
      placeholder="Alert Type"
      value={newAlert.alertType}
      onChange={(e) =>
        setNewAlert({ ...newAlert, alertType: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Location"
      value={newAlert.location}
      onChange={(e) =>
        setNewAlert({ ...newAlert, location: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Time (10:30 AM)"
      value={newAlert.time}
      onChange={(e) =>
        setNewAlert({ ...newAlert, time: e.target.value })
      }
    />

    <select
      value={newAlert.severity}
      onChange={(e) =>
        setNewAlert({ ...newAlert, severity: e.target.value })
      }
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Critical">Critical</option>
    </select>

    <select
      value={newAlert.status}
      onChange={(e) =>
        setNewAlert({ ...newAlert, status: e.target.value })
      }
    >
      <option value="Active">Active</option>
      <option value="Investigating">Investigating</option>
      <option value="Emergency">Emergency</option>
      <option value="Resolved">Resolved</option>
    </select>

    <button
  onClick={isEditing ? handleUpdate : handleAdd}
      style={{
        background: "#2e7d32",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {isEditing ? "💾 Update Alert" : "➕ Add Alert"}
    </button>
  </div>
</div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#c62828",
              color: "white",
            }}
          >
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Alert Type</th>
            <th style={thStyle}>Severity</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAlerts.map((alert) => (
            <tr key={alert.id}>
              <td style={tdStyle}>{alert.id}</td>
              <td style={tdStyle}>{alert.alertType}</td>

              <td
                style={{
                  ...tdStyle,
                  color:
                    alert.severity === "High"
                      ? "#d32f2f"
                      : alert.severity === "Medium"
                      ? "#f57c00"
                      : "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                {alert.severity}
              </td>

              <td style={tdStyle}>{alert.location}</td>
              <td style={tdStyle}>{alert.status}</td>
              <td style={tdStyle}>{alert.time}</td>

              <td style={tdStyle}>
                <button
  onClick={() => handleEdit(alert)}
  style={{
    background: "#1976d2",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  }}
>
  ✏️ Edit
</button>
                

                <button
                  onClick={() => handleDelete(alert.id)}
                  style={{
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "center",
};

const tdStyle = {
  padding: "14px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};