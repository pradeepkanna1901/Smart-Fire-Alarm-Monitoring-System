import { useEffect, useState } from "react";
import {
  getIncidents,
  addIncident,
  updateIncident,
  deleteIncident,
} from "../services/incidentService";

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
const [search, setSearch] = useState("");

const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

const [newIncident, setNewIncident] = useState({
  incidentType: "",
  location: "",
  severity: "Low",
  status: "Active",
  reportedTime: "",
});

    useEffect(() => {
        loadIncidents();
    }, []);

    const loadIncidents = async () => {
        try {
            const response = await getIncidents();
            setIncidents(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAdd = async () => {
  try {
    await addIncident(newIncident);

    alert("✅ Incident Added Successfully!");

    setNewIncident({
      incidentType: "",
      location: "",
      severity: "Low",
      status: "Active",
      reportedTime: "",
    });

    loadIncidents();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to add incident");
  }
};

const handleEdit = (incident) => {
  setNewIncident({
    incidentType: incident.incidentType,
    location: incident.location,
    severity: incident.severity,
    status: incident.status,
    reportedTime: incident.reportedTime,
  });

  setEditingId(incident.id);
  setIsEditing(true);
};

const handleUpdate = async () => {
  try {
    await updateIncident(editingId, newIncident);

    alert("✅ Incident Updated!");

    setEditingId(null);
    setIsEditing(false);

    setNewIncident({
      incidentType: "",
      location: "",
      severity: "Low",
      status: "Active",
      reportedTime: "",
    });

    loadIncidents();
  } catch (error) {
    console.error(error);
    alert("❌ Update Failed");
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this incident?")) return;

  try {
    await deleteIncident(id);
    alert("✅ Incident Deleted");
    loadIncidents();
  } catch (error) {
    console.error(error);
    alert("❌ Delete Failed");
  }
};

    return (
        <div style={{ padding: "20px" }}>
            <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  }}
>
  <h1>🚒 Incident Management</h1>

  <input
    type="text"
    placeholder="🔍 Search Incident..."
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
    boxShadow: "0 4px 10px rgba(0,0,0,.1)",
  }}
>
  <h2 style={{ textAlign: "center" }}>
    {isEditing ? "✏️ Update Incident" : "➕ Add New Incident"}
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "10px",
      marginTop: "15px",
    }}
  >
    <input
      placeholder="Incident Type"
      value={newIncident.incidentType}
      onChange={(e) =>
        setNewIncident({ ...newIncident, incidentType: e.target.value })
      }
    />

    <input
      placeholder="Location"
      value={newIncident.location}
      onChange={(e) =>
        setNewIncident({ ...newIncident, location: e.target.value })
      }
    />

    <input
      placeholder="Reported Time"
      value={newIncident.reportedTime}
      onChange={(e) =>
        setNewIncident({ ...newIncident, reportedTime: e.target.value })
      }
    />

    <select
      value={newIncident.severity}
      onChange={(e) =>
        setNewIncident({ ...newIncident, severity: e.target.value })
      }
    >
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
      <option>Critical</option>
    </select>

    <select
      value={newIncident.status}
      onChange={(e) =>
        setNewIncident({ ...newIncident, status: e.target.value })
      }
    >
      <option>Active</option>
      <option>Investigating</option>
      <option>Emergency</option>
      <option>Resolved</option>
    </select>

    <button
      onClick={isEditing ? handleUpdate : handleAdd}
      style={{
        background: "#902e7e",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {isEditing ? "💾 Update Incident" : "➕ Add Incident"}
    </button>
  </div>
</div>

            <table
                border="1"
                cellPadding="10"
                style={{ borderCollapse: "collapse", width: "100%" }}
            >
                <thead>
    <tr>
        <th>ID</th>
        <th>Incident</th>
        <th>Location</th>
        <th>Severity</th>
        <th>Status</th>
        <th>Reported Time</th>
        <th>Actions</th>
    </tr>
</thead>

                <tbody>
  {incidents.map((incident) => (
    <tr key={incident.id}>
      <td>{incident.id}</td>
      <td>{incident.incidentType}</td>
      <td>{incident.location}</td>
      <td>{incident.severity}</td>
      <td>{incident.status}</td>
      <td>{incident.reportedTime}</td>

      <td>
        <button
          onClick={() => handleEdit(incident)}
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
          onClick={() => handleDelete(incident.id)}
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