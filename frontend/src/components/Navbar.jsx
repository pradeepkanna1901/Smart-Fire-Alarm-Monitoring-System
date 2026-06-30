import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove login session
    localStorage.removeItem("loggedIn");

    // Redirect to Login page
    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#c62828",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2>🔥 Smart Fire Alarm Monitoring System</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span>Welcome, Admin</span>

        <button
          onClick={logout}
          style={{
            background: "white",
            color: "#c62828",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}