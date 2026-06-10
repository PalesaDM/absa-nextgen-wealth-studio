import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Layout() {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

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

          {auth?.user?.email && (
            <span className="navUser">{auth.user.email}
            </span>
          )}

          <button type="button" onClick={toggleTheme} className="navBtn">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>

          <button type="button" onClick={logout} className="navBtn">
            Log out
          </button>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}