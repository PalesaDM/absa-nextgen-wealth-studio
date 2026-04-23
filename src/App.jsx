import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Snapshot from "./pages/Snapshot.jsx";
import Tracks from "./pages/Tracks.jsx";
import TrackFirstProperty from "./pages/TrackFirstProperty.jsx";
import TrackBalancedLifestyle from "./pages/TrackBalancedLifestyle.jsx";
import TrackAggressiveGlobal from "./pages/TrackAggressiveGlobal.jsx";
import Studios from "./pages/Studios.jsx";
import StudioRentVsBuyJhb from "./pages/StudioRentVsBuyJhb.jsx";
import StudioCarVsUber from "./pages/StudioCarVsUber.jsx";
import StudioLocalVsOffshore from "./pages/StudioLocalVsOffshore.jsx";
import Learn from "./pages/Learn.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/snapshot" element={<Snapshot />} />

        <Route path="/tracks" element={<Tracks />} />
        <Route path="/tracks/first-property" element={<TrackFirstProperty />} />
        <Route path="/tracks/balanced" element={<TrackBalancedLifestyle />} />
        <Route path="/tracks/aggressive-global" element={<TrackAggressiveGlobal />} />

        <Route path="/studios" element={<Studios />} />
        <Route path="/studios/rent-vs-buy-jhb" element={<StudioRentVsBuyJhb />} />
        <Route path="/studios/car-vs-uber" element={<StudioCarVsUber />} />
        <Route path="/studios/local-vs-offshore" element={<StudioLocalVsOffshore />} />

        <Route path="/learn" element={<Learn />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}