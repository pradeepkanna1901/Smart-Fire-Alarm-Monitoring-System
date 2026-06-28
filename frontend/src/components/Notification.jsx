export default function Notification({ alerts }) {
  if (alerts === 0) return null;

  return (
    <div
      style={{
        background: "#dc2626",
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      🚨 {alerts} Active Fire Alert{alerts > 1 ? "s" : ""}!
    </div>
  );
}