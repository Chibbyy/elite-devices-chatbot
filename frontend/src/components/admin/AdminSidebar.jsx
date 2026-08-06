function AdminSidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Elite Devices</h2>

      <hr />

      <p>📊 Dashboard</p>
      <p>📦 Products</p>
      <p>🛒 Orders</p>
      <p>📈 Analytics</p>
      <p>⚙️ Settings</p>
    </aside>
  );
}

export default AdminSidebar;