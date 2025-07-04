import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { FaTwitter, FaCog, FaChartBar, FaTable, FaChartPie } from "react-icons/fa";
//import { MdOutlineAnalytics } from 'react-icons/md';
import CrawlingPage from "./CrawlingPage";
import PreprocessingPage from "./PreprocessingPage";
import EkstraksiFiturPage from "./EkstraksiFiturPage";
import KlasifikasiPage from "./KlasifikasiPage";
import PilihSentimenPage from "./PilihSentimenPage";
import "./App.css";

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo192.png" alt="Logo" />
        Sentimter
      </div>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <FaTwitter />
            <Link to="/">Crawling Data Twitter</Link>
          </li>
          <li
            className={location.pathname === "/preprocessing" ? "active" : ""}
          >
            <FaCog />
            <Link to="/preprocessing">Pre Processing Data</Link>
          </li>
          <li className={location.pathname === "/ekstraksi" ? "active" : ""}>
            <FaTable />
            <Link to="/ekstraksi">Ekstraksi Fitur</Link>
          </li>
          <li className={location.pathname === "/klasifikasi" ? "active" : ""}>
            <FaChartBar />
            <Link to="/klasifikasi">Klasifikasi Naive Bayes</Link>
          </li>
          <li className={location.pathname === "/pilih-sentimen" ? "active" : ""}>
            <FaChartPie className="fa-pie-chart" />
            <Link to="/pilih-sentimen">Probabilitas Tertinggi</Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <span>Dokumentasi BY Muhklis</span>
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CrawlingPage />} />
            <Route path="/preprocessing" element={<PreprocessingPage />} />
            <Route path="/ekstraksi" element={<EkstraksiFiturPage />} />
            <Route path="/klasifikasi" element={<KlasifikasiPage />} />
            <Route path="/pilih-sentimen" element={<PilihSentimenPage />} />
            {/* Route lain */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
