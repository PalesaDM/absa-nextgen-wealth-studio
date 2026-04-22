import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
    padding: "8px 10px",
    borderRadius: 10,
    textDecoration: "none",
    color: isActive ? "white" : "#a8b0c0",
    background: isActive ? "rgba(122,0,44,.25)" : "transparent",
    border: isActive ? "1px solid rgba(122,0,44,.35)" : "1px solid transparent",
});

export default function Layout() {
  return (
    <div className="app">
      <header className="topnav">
        <div className="brand">ABSA NextGen Wealth Studio</div>
        <nav className="nav">
          <NavLink to="/" end style={linkStyle}>Home</NavLink>
          <NavLink to="/snapshot" style={linkStyle}>Money Snapshot</NavLink>
          <NavLink to="/tracks" style={linkStyle}>Strategy Tracks</NavLink>
          <NavLink to="/studios" style={linkStyle}>Simulation Lab</NavLink>
          <NavLink to="/learn" style={linkStyle}>Learn</NavLink>
          <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}