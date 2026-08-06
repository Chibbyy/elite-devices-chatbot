import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardContent from "../components/admin/DashboardContent";

function AdminPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <AdminSidebar />

      <DashboardContent />
    </div>
  );
}

export default AdminPage;