function AdminSidebar({ activeView, setActiveView }) {
  const items = [
    { key: "dashboard", label: "📊 Dashboard" },
    { key: "products", label: "📦 Products" },
    { key: "orders", label: "🛒 Orders" },
    { key: "analytics", label: "📈 Analytics" },
    { key: "settings", label: "⚙️ Settings" },
  ];

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

      {items.map((item) => (
        <p
          key={item.key}
          onClick={() => setActiveView(item.key)}
          style={{
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            backgroundColor:
              activeView === item.key ? "#374151" : "transparent",
          }}
        >
          {item.label}
        </p>
      ))}
    </aside>
  );
}

export default AdminSidebar;