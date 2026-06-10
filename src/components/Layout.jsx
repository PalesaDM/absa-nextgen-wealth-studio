import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout() {
  const { auth, logout } = useAuth();

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
            <span style={{ color: "rgba(255,255,255,.85)", fontWeight: 700, padding: "9px 10px" }}>
              {auth.user.email}
            </span>
          )}

          <button
             type="button"
             onClick={logout}
             className="btn"
             style={{
              marginTop: 0,
              background: "rgba(255,255,255,.12)",
              borderColor: "rgba(255,255,255,.18)",
              color: "#fff",
             }}
          >
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