import {
  FaBell,
  FaThermometerHalf,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";

export default function StatCard({ title, value, color }) {
  const getIcon = () => {
    switch (title) {
      case "Active Alerts":
        return <FaBell size={45} color={color} />;

      case "Sensors":
        return <FaThermometerHalf size={45} color={color} />;

      case "Incidents":
        return <FaFire size={45} color={color} />;

      case "System Status":
        return <FaCheckCircle size={45} color={color} />;

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "25px",
        width: "320px",
        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        borderTop: `6px solid ${color}`,
        transition: "0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              color: "#555",
              fontSize: "18px",
            }}
          >
            {title}
          </h3>

          <h1
            style={{
              marginTop: "15px",
              fontSize: "58px",
              color: "#111827",
            }}
          >
            {value}
          </h1>
        </div>

        {getIcon()}
      </div>
    </div>
  );
}