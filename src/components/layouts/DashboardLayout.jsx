// src/components/layouts/DashboardLayout.jsx
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f5f7fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .page-content {
          padding: 2rem;
          background-color: #f5f7fa;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
