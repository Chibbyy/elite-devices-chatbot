import { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardContent from "../components/admin/DashboardContent";
import ProductsContent from "../components/admin/ProductsContent";
import OrdersContent from "../components/admin/OrdersContent";
import AdminLogin from "../components/admin/AdminLogin";

function AdminPage() {
  const [activeView, setActiveView] = useState("dashboard");
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const savedKey = localStorage.getItem("adminKey");
    setAuthenticated(!!savedKey);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return null;
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />

      {activeView === "dashboard" && <DashboardContent />}
      {activeView === "products" && <ProductsContent />}
      {activeView === "orders" && <OrdersContent />}
    </div>
  );
}

export default AdminPage;