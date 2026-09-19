import { useState } from "react";
import adminApi from "../../services/adminApi";

function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleLogin = async () => {
    setChecking(true);
    setError("");

    localStorage.setItem("adminKey", password);

    try {
      await adminApi.get("/dashboard");
      onSuccess();
    } catch (err) {
      localStorage.removeItem("adminKey");
      setError("Incorrect password. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          width: "250px",
        }}
      />

      <button
        onClick={handleLogin}
        disabled={checking}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {checking ? "Checking..." : "Login"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default AdminLogin;