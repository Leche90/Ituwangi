import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Brand/Logo */}
      <div className="logo">Ituwangi</div>

      {/* Search Bar */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      {/* Right side: notifications + profile */}
      <div className="actions">
        <div className="icon-btn">
          <FaBell />
        </div>

        <div
          className="profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="avatar"
          />
          {dropdownOpen && (
            <div className="dropdown">
              <p className="dropdown-item">Profile</p>
              <p className="dropdown-item">Settings</p>
              <p className="dropdown-item">Logout</p>
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .navbar {
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .logo {
          font-size: 1.25rem;
          font-weight: bold;
          letter-spacing: 0.5px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          width: 40%;
        }
        .search-icon {
          color: #6b7280;
          margin-right: 0.5rem;
        }
        .search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        .icon-btn {
          background: rgba(255, 255, 255, 0.15);
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .profile {
          position: relative;
          cursor: pointer;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .dropdown {
          position: absolute;
          top: 3rem;
          right: 0;
          background: white;
          color: #374151;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          animation: fadeIn 0.2s ease-in-out;
          min-width: 150px;
        }

        .dropdown-item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dropdown-item:hover {
          background: #f3f4f6;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
