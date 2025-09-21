// src/pages/freelancer/FreelancerDashboardPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Import API clients (make sure these exist in your project)
import freelancerApi from "../../api/freelancerApi";
import financeApi from "../../api/financeApi";
import invoiceApi from "../../api/invoiceApi";
import projectApi from "../../api/projectApi";
import portfolioApi from "../../api/portfolioApi";

const FreelancerDashboardPage = () => {
  const { freelancer, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for all data
  const [earningsData, setEarningsData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [earningsRes, projectsRes, invoicesRes, portfolioRes, notesRes] = 
          await Promise.allSettled([
            financeApi.getEarnings(),
            projectApi.getRecent(),
            invoiceApi.getRecent(),
            portfolioApi.getHighlights(),
            freelancerApi.getNotes()
          ]);

        // Process responses
        setEarningsData(earningsRes.status === 'fulfilled' ? earningsRes.value.data : []);
        setProjects(projectsRes.status === 'fulfilled' ? projectsRes.value.data : []);
        setInvoices(invoicesRes.status === 'fulfilled' ? invoicesRes.value.data : []);
        setPortfolio(portfolioRes.status === 'fulfilled' ? portfolioRes.value.data : []);
        setNotes(notesRes.status === 'fulfilled' ? notesRes.value.data : []);
        
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart configuration
  const chartData = {
    labels: earningsData.map(item => item.month || item.label),
    datasets: [
      {
        label: "Earnings",
        data: earningsData.map(item => item.value || item.amount),
        fill: true,
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderColor: "#2563EB",
        tension: 0.4,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        },
        ticks: {
          callback: (value) => `$${value}`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Calculate stats for invoices
  const paidInvoices = invoices.filter(inv => inv.status === "Paid").length;
  const pendingInvoices = invoices.filter(inv => inv.status === "Pending").length;
  const overdueInvoices = invoices.filter(inv => inv.status === "Overdue").length;

  // Calculate earnings summary
  const currentMonthEarnings = earningsData.length > 0 
    ? earningsData[earningsData.length - 1].value 
    : 0;
    
  const averageMonthlyEarnings = earningsData.length > 0
    ? Math.round(earningsData.reduce((sum, item) => sum + item.value, 0) / earningsData.length)
    : 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-root">
          <div className="loading-spinner">Loading dashboard data...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-root">
        {/* Top heading + actions */}
        <header className="topbar">
          <div>
            <h1 className="title">Dashboard</h1>
            <p className="subtitle">Your centralized freelance command center</p>
          </div>

          <div className="top-actions">
            <button 
              className="create-btn" 
              onClick={() => navigate("/projects/new")}
              aria-label="Create new project"
            >
              + New Project
            </button>
            <button 
              className="create-btn outline" 
              onClick={() => navigate("/invoices/new")}
              aria-label="Create new invoice"
            >
              + Create Invoice
            </button>
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              aria-label="Log out from your account"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="main-grid">
          {/* Left column: earnings + projects + invoices */}
          <div className="left-col">
            {/* Earnings Overview */}
            <div className="card earnings-card">
              <div className="card-head">
                <h3 id="earnings-chart-title">Earnings Overview</h3>
                <div className="period">Year to date</div>
              </div>

              <div className="chart-container" aria-labelledby="earnings-chart-title">
                <Line data={chartData} options={chartOptions} />
              </div>

              <div className="earnings-footer">
                <div className="summary">
                  <div className="label">This month</div>
                  <div className="value">${currentMonthEarnings.toLocaleString()}</div>
                </div>
                <div className="summary">
                  <div className="label">Avg / month</div>
                  <div className="value">${averageMonthlyEarnings.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="card small-card">
              <div className="card-head">
                <h3>Active Projects</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/projects")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/projects")}
                  tabIndex={0}
                  role="button"
                  aria-label="View all projects"
                >
                  View all
                </div>
              </div>

              <ul className="project-list">
                {projects.slice(0, 3).map((project, idx) => (
                  <li key={idx} className="project-item">
                    <div className="project-left">
                      <span 
                        className="dot" 
                        style={{ background: project.color || "#2563EB" }} 
                        aria-hidden="true"
                      />
                      <div>
                        <div className="project-title">{project.title}</div>
                        <div className="project-meta">Due {project.dueDate}</div>
                      </div>
                    </div>
                    <div 
                      className={`project-status ${project.status.replace(/\s+/g, "-").toLowerCase()}`}
                      aria-label={`Project status: ${project.status}`}
                    >
                      {project.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Invoices Summary */}
            <div className="card invoices-card">
              <div className="card-head">
                <h3>Invoices Summary</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/invoices")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/invoices")}
                  tabIndex={0}
                  role="button"
                  aria-label="Manage all invoices"
                >
                  Manage
                </div>
              </div>

              <div className="invoice-stats">
                <div className="stat-box paid" aria-label={`${paidInvoices} paid invoices`}>
                  <div className="num">{paidInvoices}</div>
                  <div className="label">Paid</div>
                </div>
                <div className="stat-box pending" aria-label={`${pendingInvoices} pending invoices`}>
                  <div className="num">{pendingInvoices}</div>
                  <div className="label">Pending</div>
                </div>
                <div className="stat-box overdue" aria-label={`${overdueInvoices} overdue invoices`}>
                  <div className="num">{overdueInvoices}</div>
                  <div className="label">Overdue</div>
                </div>
              </div>

              <div className="invoice-list">
                {invoices.slice(0, 3).map(invoice => (
                  <div key={invoice.id} className="invoice-row">
                    <div>{invoice.id} • ${invoice.amount}</div>
                    <div 
                      className={`badge ${invoice.status.toLowerCase()}`}
                      aria-label={`Invoice status: ${invoice.status}`}
                    >
                      {invoice.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: reminders, messages, portfolio, AI tools, profile */}
          <aside className="right-col">
            {/* Reminders & Deadlines */}
            <div className="card small-card">
              <div className="card-head">
                <h3>Reminders & Deadlines</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/reminders")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/reminders")}
                  tabIndex={0}
                  role="button"
                  aria-label="View all reminders"
                >
                  All
                </div>
              </div>

              <ul className="reminder-list">
                <li><strong>Invoice #INV002</strong> due in 2 days</li>
                <li><strong>Mobile App UI</strong> deadline tomorrow</li>
                <li><strong>Follow up:</strong> Claire S. (assets)</li>
              </ul>
            </div>

            {/* Client Notes */}
            <div className="card small-card">
              <div className="card-head">
                <h3>Recent Client Notes</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/messages")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/messages")}
                  tabIndex={0}
                  role="button"
                  aria-label="Open message inbox"
                >
                  Open Inbox
                </div>
              </div>

              <ul className="notes-list">
                {notes.slice(0, 3).map((note, i) => (
                  <li key={i} className="note-item">
                    <div className="note-left">
                      <div className="avatar-small" aria-hidden="true" />
                      <div>
                        <div className="note-client">
                          {note.client} <span className="note-time">{note.time}</span>
                        </div>
                        <div className="note-text">{note.note}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio Highlights */}
            <div className="card small-card">
              <div className="card-head">
                <h3>Portfolio Highlights</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/portfolio")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/portfolio")}
                  tabIndex={0}
                  role="button"
                  aria-label="Manage portfolio items"
                >
                  Manage
                </div>
              </div>

              <div className="portfolio-grid">
                {portfolio.slice(0, 2).map((item, i) => (
                  <div key={i} className="portfolio-thumb">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="portfolio-img"
                    />
                    <div className="thumb-title">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Quick Actions */}
            <div className="card small-card">
              <div className="card-head">
                <h3>AI Quick Actions</h3>
                <div 
                  className="link" 
                  onClick={() => navigate("/ai")}
                  onKeyDown={(e) => e.key === 'Enter' && navigate("/ai")}
                  tabIndex={0}
                  role="button"
                  aria-label="Open AI tools"
                >
                  Open AI
                </div>
              </div>

              <div className="button-group">
                <button 
                  className="btn-light" 
                  onClick={() => alert("Generate proposal (stub)")}
                  aria-label="Generate proposal using AI"
                >
                  Generate Proposal
                </button>
                <button 
                  className="btn-light" 
                  onClick={() => alert("Suggest price (stub)")}
                  aria-label="Get smart pricing suggestions"
                >
                  Smart Pricing
                </button>
                <button 
                  className="btn-light" 
                  onClick={() => alert("Draft invoice (stub)")}
                  aria-label="Draft invoice using AI"
                >
                  Draft Invoice
                </button>
              </div>
            </div>

            {/* Profile / Account Summary */}
            <div className="card profile-card">
              <div className="profile-row">
                <img 
                  src={freelancer?.profilePicture || "https://i.pravatar.cc/96"} 
                  alt="Profile" 
                  className="profile-img" 
                />
                <div className="profile-meta">
                  <div className="name">{freelancer?.fullName || "Freelancer Name"}</div>
                  <div className="email">{freelancer?.email || "you@business.com"}</div>
                </div>
              </div>

              <div className="profile-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => navigate("/settings")}
                  aria-label="Go to account settings"
                >
                  Account Settings
                </button>
                <button 
                  className="btn-outline" 
                  onClick={() => navigate("/portfolio/new")}
                  aria-label="Add new portfolio item"
                >
                  Add Portfolio
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {/* Styles (scoped inline) */}
      <style>{`
        :root {
          --bg: #F8FAFC;
          --card: #FFFFFF;
          --muted: #6B7280;
          --blue: #2563EB;
          --soft: #F1F5F9;
        }

        .page-root { padding: 1.25rem 1.75rem; }
        .loading-spinner { text-align: center; padding: 2rem; color: var(--muted); }

        .topbar { display:flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; gap: 1rem; }
        .title { font-size: 1.5rem; margin: 0; color: #0F172A; font-weight: 700; }
        .subtitle { margin: 0; color: var(--muted); font-size: 0.95rem; }

        .top-actions { display:flex; gap: 0.5rem; align-items:center; }
        .create-btn { background: var(--blue); color: white; border: none; padding: 0.5rem 0.9rem; border-radius: 8px; cursor:pointer; font-weight:600; }
        .create-btn.outline { background: transparent; color: var(--blue); border: 1px solid rgba(37,99,235,0.15); }
        .logout-btn { background: transparent; color: #374151; border: 1px solid transparent; padding: 0.45rem 0.7rem; border-radius: 8px; cursor:pointer; }
        
        .create-btn:focus, .logout-btn:focus, .btn-light:focus, .btn-primary:focus, .btn-outline:focus {
          outline: 2px solid var(--blue);
          outline-offset: 2px;
        }

        .main-grid { display: grid; grid-template-columns: 1fr 360px; gap: 1.25rem; align-items: start; }

        .left-col { display:flex; flex-direction: column; gap: 1.25rem; }
        .right-col { display:flex; flex-direction: column; gap: 1rem; }

        .card { background: var(--card); border-radius: 12px; padding: 1rem; box-shadow: 0 6px 18px rgba(11,22,55,0.04); border: 1px solid rgba(15,23,42,0.03); }

        .card-head { display:flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .card-head h3 { margin: 0; font-size: 1.05rem; color: #0F172A; }
        .card-head .period { color: var(--muted); font-size: 0.85rem; }
        .link { color: var(--blue); cursor: pointer; font-size: 0.9rem; font-weight: 600; }
        .link:focus { outline: 2px solid var(--blue); outline-offset: 2px; }

        /* Earnings */
        .earnings-card { padding: 1rem 1rem 0.75rem 1rem; }
        .chart-container { width: 100%; height: 140px; margin: 0.5rem 0 0.75rem 0; }

        .earnings-footer { display:flex; gap:1rem; justify-content:flex-start; padding: 0.5rem 0 1rem 0; }
        .summary .label { color: var(--muted); font-size: 0.85rem; }
        .summary .value { font-weight: 700; font-size: 1rem; color: #0F172A; }

        /* small card list */
        .small-card { padding-bottom: 0.5rem; }
        .project-list { padding: 0; margin: 0; list-style: none; display:flex; flex-direction:column; gap: 0.6rem; }
        .project-item { display:flex; justify-content: space-between; align-items:center; padding: 0.55rem 0; border-bottom: 1px solid rgba(15,23,42,0.04); }
        .project-left { display:flex; gap: 0.75rem; align-items:center; }
        .dot { width:12px; height:12px; border-radius: 50%; flex-shrink:0; }
        .project-title { font-weight:600; color:#0F172A; }
        .project-meta { font-size: 0.85rem; color: var(--muted); }

        .project-status { font-size: 0.85rem; padding: 0.25rem 0.6rem; border-radius: 999px; background: #F1F5F9; color: #0F172A; font-weight:600; }
        .project-status.in-progress { background: rgba(249,115,22,0.08); color: #F97316; }
        .project-status.active { background: rgba(16,185,129,0.08); color: #10B981; }
        .project-status.review { background: rgba(37,99,235,0.08); color: #2563EB; }

        /* Invoices */
        .invoices-card { display:flex; flex-direction: column; gap: 0.75rem; }
        .invoice-stats { display:flex; gap: 0.75rem; }
        .stat-box { flex:1; border-radius: 12px; padding: 0.9rem; color: white; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .stat-box .num { font-size:1.35rem; font-weight:700; }
        .stat-box .label { font-size:0.9rem; opacity:0.95; margin-top:0.25rem; }
        .stat-box.paid { background:#10B981; }
        .stat-box.pending { background:#F59E0B; }
        .stat-box.overdue { background:#EF4444; }

        .invoice-list { margin-top: 0.6rem; display:flex; flex-direction:column; gap: 0.45rem; }
        .invoice-row { display:flex; justify-content:space-between; align-items:center; padding: 0.5rem 0; border-top: 1px dashed rgba(15,23,42,0.03); }
        .badge { padding: 0.2rem 0.6rem; border-radius: 999px; font-weight:600; font-size:0.85rem; }
        .badge.paid { background: #DCFCE7; color: #065F46; }
        .badge.pending { background: #FEF3C7; color: #92400E; }
        .badge.overdue { background: #FEE2E2; color: #991B1B; }

        /* Right column cards */
        .reminder-list, .notes-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap: 0.5rem; }
        .reminder-list li { padding: 0.45rem 0; color: #0F172A; }

        .note-item { display:flex; gap:0.6rem; padding: 0.45rem 0; border-bottom: 1px solid rgba(15,23,42,0.03); }
        .avatar-small { width:40px; height:40px; border-radius:50%; background: #E6EEF8; flex-shrink:0; }
        .note-client { font-weight:700; color: #0F172A; font-size: 0.95rem; }
        .note-time { color: var(--muted); font-weight: normal; font-size: 0.8rem; margin-left: 0.5rem; }
        .note-text { color: var(--muted); font-size: 0.9rem; }

        .portfolio-grid { display:flex; gap: 0.6rem; }
        .portfolio-thumb { width: 100px; text-align:center; }
        .portfolio-img { width:100%; height:60px; object-fit:cover; border-radius:8px; display:block; margin-bottom:0.45rem; }
        .thumb-title { font-size:0.9rem; color:#0F172A; }

        .button-group { display:flex; gap: 0.5rem; flex-wrap:wrap; margin-top:0.5rem; }
        .btn-light { background: #F8FAFC; border:1px solid rgba(2,6,23,0.04); padding:0.45rem 0.65rem; border-radius:8px; cursor:pointer; }
        .btn-light:hover, .btn-light:focus { background: #EDF2FF; }

        .profile-card .profile-row { display:flex; gap:0.75rem; align-items:center; }
        .profile-img { width:72px; height:72px; border-radius: 12px; object-fit:cover; }
        .profile-meta .name { font-weight:700; color:#0F172A; }
        .profile-meta .email { font-size:0.9rem; color:var(--muted); }

        .profile-actions { display:flex; gap:0.5rem; margin-top:0.8rem; }
        .btn-primary { background: var(--blue); color:white; border:none; padding:0.5rem 0.75rem; border-radius:8px; cursor:pointer; }
        .btn-outline { background: transparent; border:1px solid rgba(2,6,23,0.06); padding:0.5rem 0.75rem; border-radius:8px; cursor:pointer; }

        /* Responsive */
        @media (max-width: 980px) {
          .main-grid { grid-template-columns: 1fr; }
          .right-col { order: 2; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;