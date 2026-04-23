import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <header className="topnav">
        <div className="brand">ABSA NextGen Wealth Studio</div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/snapshot" className={({ isActive }) => (isActive ? "active" : "")}>
            Money Snapshot
          </NavLink>
          <NavLink to="/tracks" className={({ isActive }) => (isActive ? "active" : "")}>
            Strategy Tracks
          </NavLink>
          <NavLink to="/studios" className={({ isActive }) => (isActive ? "active" : "")}>
            Simulation Lab
          </NavLink>
          <NavLink to="/learn" className={({ isActive }) => (isActive ? "active" : "")}>
            Learn
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            Profile
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}