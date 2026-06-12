import { useState, useMemo } from "react";
import "./Dashboard.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ResponsiveHeatMap } from "@nivo/heatmap";

import {
  foodPrices,
  inflationData,
  itemMetadata,
} from "../data/dummyData";
import { getItemAverages, applyFilters } from "../utils/dataCalculations";

const transformHeatMapData = (data) => {
  if (!data || data.length === 0) return [];

  // Get cities from the first item's keys (excluding 'item')
  const cities = Object.keys(data[0]).filter(key => key !== 'item');

  return cities.map(city => ({
    id: city,
    data: data.map(item => ({
      x: item.item,
      y: item[city] || 0,
    })),
  }));
};

const insights = [
  { bg: "#FCEBEB", iconColor: "#A32D2D", icon: "ti-trending-up",
    text: "Street food inflation (8.4%) is running 3.3 pp above official CPI food — real cost-of-living pressure on low-income consumers is likely understated.",
    sub: "SFPI leads CPI by ~3 weeks (Granger p = 0.031)" },
  { bg: "#FAEEDA", iconColor: "#854F0B", icon: "ti-device-mobile",
    text: "Mumbai shows the widest app-vs-street gap — Biryani on Swiggy costs 2.4× the street stall price, the highest of any city-item pair.",
    sub: "App premium widening by ~0.1× per quarter across all cities" },
  { bg: "#E1F5EE", iconColor: "#085041", icon: "ti-map-pin",
    text: "Chennai remains the most affordable city — 17% below the national median for Biryani. Chai shows the smallest zone gap of any item (8%).",
    sub: "Central zones price 34% above peripheral on average" },
];

// City comparison table data (Biryani street prices vs median)
const cityData = [
  { city: "Hyderabad", avg: 135, vs: "-5%",  cls: "tlo", trend: "▼ stable", tcolor: "#085041" },
  { city: "Mumbai",    avg: 168, vs: "+18%", cls: "thi", trend: "▲ rising", tcolor: "#A32D2D" },
  { city: "Delhi",     avg: 152, vs: "+7%",  cls: "tmd", trend: "▲ rising", tcolor: "#633806" },
  { city: "Bengaluru", avg: 144, vs: "+1%",  cls: "tmd", trend: "— flat",   tcolor: "#633806" },
  { city: "Chennai",   avg: 118, vs: "-17%", cls: "tlo", trend: "▼ stable", tcolor: "#085041" },
];

function Dashboard() {
  // Filter state
  const [selectedCities, setSelectedCities] = useState(["Hyderabad", "Mumbai", "Delhi", "Bengaluru", "Chennai"]);
  const [selectedItems, setSelectedItems] = useState(["Biryani", "Dosa", "Vada Pav", "Pani Puri", "Samosa", "Chai"]);
  const [selectedZones, setSelectedZones] = useState(["Central", "Suburban", "Peripheral"]);
  const [dateRange, setDateRange] = useState("Apr – Jun 2025");
  const [showApp, setShowApp] = useState(true);
  const [showStreet, setShowStreet] = useState(true);
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);

  // Filtered data computed from state
  const filteredFoodPrices = useMemo(() => {
    const filtered = applyFilters(foodPrices, itemMetadata, {
      selectedItems,
      selectedCities,
      showVeg,
      showNonVeg,
    });
    // Fallback to full data if filtering results in empty array
    return filtered && filtered.length > 0 ? filtered : foodPrices;
  }, [selectedItems, selectedCities, showVeg, showNonVeg]);

  // Calculate KPI values from filtered data
  const calculatedKPIs = useMemo(() => {
    const itemAvgs = getItemAverages(filteredFoodPrices);
    const avgPrice = itemAvgs.length ? Math.round(itemAvgs.reduce((sum, i) => sum + i.avg, 0) / itemAvgs.length) : 0;
    return {
      avgPrice,
      sfpiInflation: 8.4,
      appPremium: 2.1,
      records: filteredFoodPrices.length * selectedCities.length,
    };
  }, [filteredFoodPrices, selectedCities]);

  const kpis = [
    {
      label: "Avg Price",
      val: `₹${calculatedKPIs.avgPrice}`,
      stroke: "#1D9E75",
      points: "0,18 9,16 18,15 28,13 37,10 46,8 56,6",
      delta: "+6.2% this quarter",
      cls: "delta-up",
      icon: "ti-trending-up",
    },
    {
      label: "SFPI Inflation",
      val: `${calculatedKPIs.sfpiInflation}%`,
      stroke: "#D85A30",
      points: "0,18 9,17 18,15 28,13 37,11 46,9 56,7",
      delta: "vs CPI food 5.1%",
      cls: "delta-up",
      icon: "ti-alert-triangle",
    },
    {
      label: "App Premium",
      val: `${calculatedKPIs.appPremium}×`,
      stroke: "#534AB7",
      points: "0,16 9,15 18,14 28,12 37,10 46,8 56,6",
      delta: "app prices 110% higher",
      cls: "delta-up",
      icon: "ti-device-mobile",
    },
    {
      label: "Records",
      val: calculatedKPIs.records,
      stroke: "#888780",
      points: "0,20 9,18 18,16 28,14 37,11 46,9 56,7",
      delta: "5 cities · 14 items",
      cls: "delta-neu",
      icon: "ti-database",
    },
  ];

  const chartData = useMemo(() => {
    const itemAvgs = getItemAverages(filteredFoodPrices || []);
    return itemAvgs.map(({ item, avg }) => ({
      item,
      price: Math.round(avg * 10) / 10,
    }));
  }, [filteredFoodPrices]);

  // Event handlers
  const handleCityChange = (e) => {
    const value = e.target.value;
    if (value === "All cities") {
      setSelectedCities(["Hyderabad", "Mumbai", "Delhi", "Bengaluru", "Chennai"]);
    } else {
      setSelectedCities([value]);
    }
  };

  const handleItemChange = (e) => {
    const value = e.target.value;
    if (value === "All items") {
      setSelectedItems(["Biryani", "Dosa", "Vada Pav", "Pani Puri", "Samosa", "Chai"]);
    } else {
      setSelectedItems([value]);
    }
  };

  const handleZoneChange = (e) => {
    const value = e.target.value;
    if (value === "All zones") {
      setSelectedZones(["Central", "Suburban", "Peripheral"]);
    } else {
      setSelectedZones([value]);
    }
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="db" style={{ margin: '20px' }}>

      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div className="app-icon">
            <i className="ti ti-bowl" style={{ fontSize: '14px', color: '#085041' }} aria-hidden="true" />
          </div>
          <div>
            <div className="app-title">Street food price intelligence</div>
            <div className="app-sub">5 cities · 1,240 records · updated 3 days ago</div>
          </div>
        </div>
        <div className="nav-pills">
          {["Overview", "City compare", "SFPI vs CPI", "Raw data"].map((label, i) => (
            <button key={label} className={`npill${i === 0 ? ' active' : ''}`}>{label}</button>
          ))}
        </div>
      </div>

      <div className="filter-bar">
        <span className="flabel">Filters</span>
        <select className="fsel" onChange={handleCityChange} value={selectedCities.length === 5 ? "All cities" : (selectedCities[0] || "All cities")}>
          <option>All cities</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Bengaluru</option>
          <option>Chennai</option>
        </select>
        <select className="fsel" onChange={handleItemChange} value={selectedItems.length === 6 ? "All items" : (selectedItems[0] || "All items")}>
          <option>All items</option>
          <option>Biryani</option>
          <option>Dosa</option>
          <option>Vada Pav</option>
          <option>Pani Puri</option>
          <option>Samosa</option>
          <option>Chai</option>
        </select>
        <select className="fsel" onChange={handleZoneChange} value={selectedZones.length === 3 ? "All zones" : (selectedZones[0] || "All zones")}>
          <option>All zones</option>
          <option>Central</option>
          <option>Suburban</option>
          <option>Peripheral</option>
        </select>
        <select className="fsel" onChange={handleDateRangeChange} value={dateRange}>
          <option>Apr – Jun 2025</option>
          <option>Jan – Mar 2025</option>
          <option>Oct – Dec 2024</option>
        </select>
        <div className="fsep" />
        <button className={`ftoggle ${showApp ? 'on' : ''}`} onClick={() => setShowApp(!showApp)}>App</button>
        <button className={`ftoggle ${showStreet ? 'on' : ''}`} onClick={() => setShowStreet(!showStreet)}>Street</button>
        <div className="fsep" />
        <button className={`ftoggle ${showVeg ? 'on' : ''}`} onClick={() => setShowVeg(!showVeg)}>Veg</button>
        <button className={`ftoggle ${showNonVeg ? 'on' : ''}`} onClick={() => setShowNonVeg(!showNonVeg)}>Non-veg</button>
      </div>

      <div className="body">

        {/* KPI Cards — sparklines only, no charts inside */}
        <div className="kpi-row">
          {kpis.map(({ label, val, stroke, points, delta, cls, icon }) => (
            <div key={label} className="kpi">
              <div className="kpi-label">{label}</div>
              <div className="kpi-main">
                <div className="kpi-val">{val}</div>
                <svg className="kpi-spark" viewBox="0 0 56 22" fill="none">
                  <polyline points={points} stroke={stroke} strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div className={`kpi-delta ${cls}`}>
                <i className={`ti ${icon}`} style={{ fontSize: '10px' }} aria-hidden="true" /> {delta}
              </div>
            </div>
          ))}
        </div>

        {/* Hero row — heatmap (left 2/3) + bar chart (right 1/3) */}
        <div className="hero-row">
          <div className="card">
            <div className="ctitle">Price heat map — by item &amp; city</div>
            <div className="csub">Street food prices (₹) · darker = costlier</div>
            <div className="nivo-heatmap-container" style={{ height: "400px" }}> {/* Added explicit height here */}
              <ResponsiveHeatMap
                data={transformHeatMapData(filteredFoodPrices)}
                margin={{ top: 30, right: 120, bottom: 40, left: 60 }}
                valueFormat=">-.0f"
                colors={{
                  type: 'diverging',
                  scheme: 'spectral',
                  divergeAt: 0.5,
                  minValue: 10,
                  maxValue: 180,
                }}
                cellOpacity={1}
                cellRadius={4}
                cellBorderWidth={1.5}
                cellBorderColor="#ffffff"
                labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                xAxisLabel="Food Item"
                yAxisLabel="City"
                xAxisPosition="bottom"
                yAxisPosition="left"
                motionConfig="stiff"
                tooltip={({ xValue, yValue, value }) => (
                  <div className="nivo-tooltip">
                    <strong>₹{value}</strong>
                    <div style={{ fontSize: '11px', color: '#666' }}>{xValue} in {yValue}</div>
                  </div>
                )}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    length: 200,
                    thickness: 12,
                    title: 'Price Range (₹)',
                    titleOffset: 10,
                  },
                ]}
              />
            </div>
          </div>

          <div className="card">
            <div className="ctitle">Avg price by item</div>
            <div className="csub">Street stalls · all cities</div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="item" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: '0.5px solid #e5e7eb' }}
                  formatter={(v) => [`₹${v}`, 'Price']}
                />
                <Bar dataKey="price" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mid row — line chart (left) + city table (right) */}
        <div className="mid-row">
          <div className="card">
            <div className="ctitle">Inflation trend</div>
            <div className="csub">Monthly index · Jan 2025 = 100</div>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={inflationData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} domain={[98, 116]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '0.5px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="sfpi"     name="SFPI"      stroke="#D85A30" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cpi"      name="CPI food"  stroke="#378ADD" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="appIndex" name="App index" stroke="#888780" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="granger">
              <i className="ti ti-flask" style={{ fontSize: '10px' }} aria-hidden="true" /> Granger test p = 0.031 — SFPI leads CPI by ~3 weeks
            </div>
          </div>

          <div className="card">
            <div className="ctitle">City comparison</div>
            <div className="csub">Biryani · street stalls · vs median</div>
            <table className="tbl">
              <thead>
                <tr><th>City</th><th>Avg</th><th>vs med.</th><th>Trend</th></tr>
              </thead>
              <tbody>
                {cityData.map(({ city, avg, vs, cls, trend, tcolor }) => (
                  <tr key={city}>
                    <td>{city}</td>
                    <td>₹{avg}</td>
                    <td><span className={`tag ${cls}`}>{vs}</span></td>
                    <td style={{ fontSize: '11px', color: tcolor }}>{trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="insight-card">
          <div className="insight-header">
            <i className="ti ti-sparkles" style={{ fontSize: '15px', color: '#534AB7' }} aria-hidden="true" />
            <span>AI insights</span>
            <span className="ai-badge">auto-generated</span>
            <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: 'auto' }}>Based on current filters</span>
          </div>
          <div className="insight-list">
            {insights.map(({ bg, iconColor, icon, text, sub }) => (
              <div key={sub} className="irow">
                <div className="iicon" style={{ background: bg }}>
                  <i className={`ti ${icon}`} style={{ fontSize: '12px', color: iconColor }} aria-hidden="true" />
                </div>
                <div>
                  <div className="itext">{text}</div>
                  <div className="isub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;