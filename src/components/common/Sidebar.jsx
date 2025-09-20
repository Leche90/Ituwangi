import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Projects", path: "/freelancer/projects" },
    { name: "Invoices", path: "/freelancer/invoices" },
    { name: "Portfolio", path: "/freelancer/portfolio" },
    { name: "Finance", path: "/freelancer/finance" },
    { name: "AI Tools", path: "/freelancer/ai" },
    { name: "Settings", path: "/freelancer/settings" },
  ];

  return (
    <aside style={{
      width: '16rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '60vh',
      margin: '1rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        color: '#1f2937',
        textAlign: 'center'
      }}>SaaS App</h2>

      <ul style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={{
                display: 'block',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === item.path ? '#2563eb' : 'transparent',
                color: location.pathname === item.path ? 'white' : '#1f2937',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) e.target.style.backgroundColor = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) e.target.style.backgroundColor = 'transparent';
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={onLogout}
        style={{
          marginTop: 'auto',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          backgroundColor: '#ef4444',
          color: 'white',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#dc2626'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = '#ef4444'; }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
