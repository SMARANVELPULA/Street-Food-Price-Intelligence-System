import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/price-analysis", label: "Price Analysis" },
  { to: "/inflation-analysis", label: "Inflation Analysis" },
  { to: "/map", label: "Map View" },
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div style={{
      width: '200px', flexShrink: 0, padding: '20px 16px',
      borderRight: '1px solid #e5e7eb', minHeight: 'calc(100vh - 45px)',
      backgroundColor: '#fff',
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} style={{
              display: 'block', padding: '7px 10px', borderRadius: '6px',
              textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              color: pathname === to ? '#085041' : '#374151',
              background: pathname === to ? '#E1F5EE' : 'transparent',
            }}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;