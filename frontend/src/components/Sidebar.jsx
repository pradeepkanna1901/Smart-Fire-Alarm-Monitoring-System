import {
  FaTachometerAlt,
  FaThermometerHalf,
  FaBell,
  FaExclamationTriangle,
  FaCog,
  FaFilePdf,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Sensors", path: "/sensors", icon: <FaThermometerHalf /> },
    { name: "Alerts", path: "/alerts", icon: <FaBell /> },
    { name: "Incidents", path: "/incidents", icon: <FaExclamationTriangle /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Reports", path: "/reports", icon: <FaFilePdf /> },
  ];

  return (
    <div
      style={{
        width: "250px",
        background: "#c62828",
        color: "white",
        minHeight: "100vh",
        paddingTop: "25px",
        boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "white",
          letterSpacing: "2px",
          fontWeight: "bold",
        }}
      >
        MENU
      </h2>

      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "16px 25px",
            color: "white",
            textDecoration: "none",
            background:
              location.pathname === item.path ? "#8B0000" : "transparent",
            transition: "0.3s",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}