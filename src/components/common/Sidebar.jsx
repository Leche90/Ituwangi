import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaProjectDiagram,
  FaFileInvoice,
  FaBriefcase,
  FaWallet,
  FaRobot,
  FaCog,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Invoices", path: "/invoices", icon: <FaFileInvoice /> },
    { name: "Portfolio", path: "/portfolio", icon: <FaBriefcase /> },
    { name: "Finance", path: "/finance", icon: <FaWallet /> },
    { name: "AI Tools", path: "/ai", icon: <FaRobot /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </div>

      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.path} className="menu-item">
            <Link
              to={item.path}
              className={`menu-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .sidebar {
          width: 16rem;
          background: #ffffff;
          box-shadow: 2px 0 6px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          padding: 1rem 0;
          transition: width 0.3s ease;
          position: sticky;
          top: 0;
          height: 100vh;
          border-right: 1px solid #e5e7eb;
        }
        .sidebar.collapsed {
          width: 5rem;
        }

        .toggle-btn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0.75rem;
          cursor: pointer;
          color: #374151;
          font-size: 1.2rem;
          transition: color 0.2s ease;
        }
        .toggle-btn:hover {
          color: #2563eb;
        }

        .menu-list {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.5rem;
        }

        .menu-item {
          list-style: none;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          transition: background 0.3s, color 0.3s;
        }

        .menu-link:hover {
          background: #f3f4f6;
          color: #2563eb;
        }

        .menu-link.active {
          background: #2563eb;
          color: white;
        }

        .icon {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 1.5rem;
        }

        .label {
          white-space: nowrap;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
