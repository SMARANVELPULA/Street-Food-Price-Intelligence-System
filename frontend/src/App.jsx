import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import PriceAnalysis from "./pages/PriceAnalysis";
import InflationAnalysis from "./pages/InflationAnalysis";
import MapView from "./pages/MapView";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ display: "flex", gap: "20px" }}>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/price-analysis" element={<PriceAnalysis />} />
          <Route path="/inflation-analysis" element={<InflationAnalysis />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;