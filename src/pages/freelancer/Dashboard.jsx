// src/pages/freelancer/FreelancerDashboardPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const FreelancerDashboardPage = () => {
  const { freelancer, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome, {freelancer?.fullName || "Freelancer"}
          </h1>
        </div>        
      </div>

      <p className="dashboard-intro">
        This is your main dashboard. From here you can manage projects,
        invoices, portfolio, finances, and access AI tools.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p className="stat-number stat-blue">5</p>
        </div>

        <div className="stat-card">
          <h3>Pending Invoices</h3>
          <p className="stat-number stat-green">3</p>
        </div>

        <div className="stat-card">
          <h3>AI Suggestions</h3>
          <p className="stat-number stat-purple">2</p>
        </div>
      </div>

      <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0rem;
        }

        .dashboard-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #374151; /* deep professional blue */
        }

        .dashboard-intro {
          color: #374151;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background-color: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: bold;
        }

        .stat-blue {
          color: #2563eb; /* consistent with login blue */
        }
        .stat-green {
          color: #FF8A65;
        }
        .stat-purple {
          color: #7c3aed;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default FreelancerDashboardPage;
