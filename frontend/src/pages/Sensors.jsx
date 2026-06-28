import { useEffect, useState } from "react";
import {
  getSensors,
  addSensor,
  deleteSensor,
  updateSensor,
} from "../services/sensorService";

export default function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    sensorName: "",
    location: "",
    status: "Normal",
    temperature: "",
    smokeLevel: "",
  });

  useEffect(() => {
    loadSensors();
  }, []);

  const loadSensors = async () => {
    try {
      const response = await getSensors();
      setSensors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sensor?")) return;

    try {
      await deleteSensor(id);
      loadSensors();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = (sensor) => {
    setEditingId(sensor.id);

    setFormData({
      sensorName: sensor.sensorName,
      location: sensor.location,
      status: sensor.status,
      temperature: sensor.temperature,
      smokeLevel: sensor.smokeLevel,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateSensor(editingId, formData);

      alert("Sensor Updated");

      setEditingId(null);

      setFormData({
        sensorName: "",
        location: "",
        status: "Normal",
        temperature: "",
        smokeLevel: "",
      });

      loadSensors();
    } catch (err) {
      alert("Update Failed");
    }
  };
  const handleAdd = async () => {
  try {
    await addSensor(formData);

    alert("Sensor Added Successfully");

    setFormData({
      sensorName: "",
      location: "",
      status: "Normal",
      temperature: "",
      smokeLevel: "",
    });

    loadSensors();
  } catch (err) {
    alert("Add Failed");
  }
};

  const filteredSensors = sensors.filter(
    (sensor) =>
      sensor.sensorName.toLowerCase().includes(search.toLowerCase()) ||
      sensor.location.toLowerCase().includes(search.toLowerCase()) ||
      sensor.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 30 }}>

      <h1>📡 Sensor Management</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: 300,
          marginBottom: 20,
        }}
      />

      {editingId && (
        <div
          style={{
            padding: 20,
            marginBottom: 30,
            border: "1px solid #ccc",
            borderRadius: 10,
            background: "#fafafa",
          }}
        >
          <h2>Edit Sensor</h2>

          <input
            placeholder="Sensor Name"
            value={formData.sensorName}
            onChange={(e) =>
              setFormData({
                ...formData,
                sensorName: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
          />

          <br />
          <br />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option>Normal</option>
            <option>Warning</option>
            <option>Critical</option>
          </select>

          <br />
          <br />

          <input
            type="number"
            placeholder="Temperature"
            value={formData.temperature}
            onChange={(e) =>
              setFormData({
                ...formData,
                temperature: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="number"
            placeholder="Smoke Level"
            value={formData.smokeLevel}
            onChange={(e) =>
              setFormData({
                ...formData,
                smokeLevel: e.target.value,
              })
            }
          />

          <br />
          <br />

          <button
            onClick={handleUpdate}
            style={{
              background: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update Sensor
          </button>
        </div>
      )}
{!editingId && (
  <div
    style={{
      padding: 20,
      marginBottom: 30,
      border: "1px solid #ccc",
      borderRadius: 10,
      background: "#f5f5f5",
    }}
  >
    <h2>Add Sensor</h2>

    <input
      placeholder="Sensor Name"
      value={formData.sensorName}
      onChange={(e) =>
        setFormData({
          ...formData,
          sensorName: e.target.value,
        })
      }
    />

    <br /><br />

    <input
      placeholder="Location"
      value={formData.location}
      onChange={(e) =>
        setFormData({
          ...formData,
          location: e.target.value,
        })
      }
    />

    <br /><br />

    <select
      value={formData.status}
      onChange={(e) =>
        setFormData({
          ...formData,
          status: e.target.value,
        })
      }
    >
      <option>Normal</option>
      <option>Warning</option>
      <option>Critical</option>
    </select>

    <br /><br />

    <input
      type="number"
      placeholder="Temperature"
      value={formData.temperature}
      onChange={(e) =>
        setFormData({
          ...formData,
          temperature: e.target.value,
        })
      }
    />

    <br /><br />

    <input
      type="number"
      placeholder="Smoke Level"
      value={formData.smokeLevel}
      onChange={(e) =>
        setFormData({
          ...formData,
          smokeLevel: e.target.value,
        })
      }
    />

    <br /><br />

    <button
      onClick={handleAdd}
      style={{
        background: "#2e7d32",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
      }}
    >
      ➕ Add Sensor
    </button>
  </div>
)}¸
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#c62828", color: "white" }}>
            <th>ID</th>
            <th>Sensor</th>
            <th>Location</th>
            <th>Status</th>
            <th>Temperature</th>
            <th>Smoke</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredSensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.sensorName}</td>
              <td>{sensor.location}</td>
              <td>{sensor.status}</td>
              <td>{sensor.temperature}</td>
              <td>{sensor.smokeLevel}</td>

              <td>
                <button
                  onClick={() => handleEdit(sensor)}
                  style={{
                    marginRight: 10,
                    background: "#1976d2",
                    color: "white",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(sensor.id)}
                  style={{
                    background: "#d32f2f",
                    color: "white",
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