import { useEffect, useState } from "react";
import {
  FaBell,
  FaThermometerHalf,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";

export default function StatCard({ title, value, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value !== "number") return;

    let current = 0;
    const increment = 1;

    const timer = setInterval(() => {
      current += increment;

      if (current >= value) {
        current = value;
        clearInterval(timer);
      }

      setCount(current);
    }, 10);

    return () => clearInterval(timer);
  }, [value]);

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
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(0,0,0,.20)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,.12)";
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

    fontSize:

      title === "System Status"

        ? "42px"

        : "58px",

    color: "#111827",

  }}
          >
            {typeof value === "number" ? count : value}
          </h1>
        </div>

        {getIcon()}
      </div>
    </div>
  );
}