import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardContent from "../components/admin/DashboardContent";
import ProductsContent from "../components/admin/ProductsContent";
import OrdersContent from "../components/admin/OrdersContent";

function AdminPage() {
  const [activeView, setActiveView] = useState("dashboard");

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