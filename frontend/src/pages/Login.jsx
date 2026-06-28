import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("loggedIn", "true");

        setMessage("✅ Login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("❌ " + response.data.message);
      }
    } catch (error) {
      setMessage("❌ Cannot connect to server");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
      }}
    >
      <form
        onSubmit={login}
        style={{
          width: "380px",
          background: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#c62828",
            marginBottom: "25px",
          }}
        >
          🔥 Smart Fire Alarm Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#c62828",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}