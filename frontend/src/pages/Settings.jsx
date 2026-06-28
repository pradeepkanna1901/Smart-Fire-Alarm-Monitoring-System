import { useEffect, useState } from "react";
import {
  getSettings,
  addSettings,
  updateSettings,
  deleteSettings,
} from "../services/settingsService";

export default function Settings() {
  const [settings, setSettings] = useState({
    adminEmail: "",
    temperature: 60,
    smoke: 300,
    notifications: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();

      if (response.data.length > 0) {
        setSettings(response.data[0]);
        setEditingId(response.data[0].id);
        setIsEditing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateSettings(editingId, settings);
        alert("✅ Settings Updated Successfully!");
      } else {
        await addSettings(settings);
        alert("✅ Settings Saved Successfully!");
      }

      loadSettings();
    } catch (error) {
      console.log(error);
      alert("❌ Operation Failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete current settings?")) return;

    try {
      await deleteSettings(editingId);

      alert("✅ Settings Deleted Successfully!");

      setSettings({
        adminEmail: "",
        temperature: 60,
        smoke: 300,
        notifications: true,
      });

      setEditingId(null);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "30px auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,.2)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        ⚙️ System Settings
      </h2>

      <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
          <label>Admin Email</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Temperature Threshold</label>
          <input
            type="number"
            name="temperature"
            value={settings.temperature}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Smoke Threshold</label>
          <input
            type="number"
            name="smoke"
            value={settings.smoke}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />{" "}
            Enable Notifications
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {isEditing ? "💾 Update Settings" : "💾 Save Settings"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              style={{
                background: "#d32f2f",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}