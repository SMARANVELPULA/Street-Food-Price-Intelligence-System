import React from "react";
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

const foodPrices = [
  { item: "Biryani",  price: 142 },
  { item: "Dosa",     price: 68  },
  { item: "Vada Pav", price: 28  },
  { item: "Pani Puri",price: 25  },
  { item: "Samosa",   price: 18  },
  { item: "Chai",     price: 12  },
];

const inflationData = [
  { month: "Jan", sfpi: 100,   cpi: 100,   appIndex: 100   },
  { month: "Feb", sfpi: 102,   cpi: 101,   appIndex: 103   },
  { month: "Mar", sfpi: 104,   cpi: 102,   appIndex: 106   },
  { month: "Apr", sfpi: 106,   cpi: 103,   appIndex: 110   },
  { month: "May", sfpi: 108,   cpi: 104,   appIndex: 113   },
  { month: "Jun", sfpi: 108.4, cpi: 105.1, appIndex: 114.2 },
];

const cityData = [
  { city: "Hyderabad", avg: 135, vs: "-5%",  cls: "tlo", trend: "▼ stable", tcolor: "#085041" },
  { city: "Mumbai",    avg: 168, vs: "+18%", cls: "thi", trend: "▲ rising", tcolor: "#A32D2D" },
  { city: "Delhi",     avg: 152, vs: "+7%",  cls: "tmd", trend: "▲ rising", tcolor: "#633806" },
  { city: "Bengaluru", avg: 144, vs: "+1%",  cls: "tmd", trend: "— flat",   tcolor: "#633806" },
  { city: "Chennai",   avg: 118, vs: "-17%", cls: "tlo", trend: "▼ stable", tcolor: "#085041" },
];

const kpis = [
  { label: "Avg price",      val: "₹87",   stroke: "#1D9E75", points: "0,18 9,16 18,15 28,13 37,10 46,8 56,6", delta: "+6.2% this quarter",    cls: "delta-up",  icon: "ti-trending-up"    },
  { label: "SFPI inflation", val: "8.4%",  stroke: "#D85A30", points: "0,18 9,17 18,15 28,13 37,11 46,9 56,7", delta: "vs CPI food 5.1%",       cls: "delta-up",  icon: "ti-alert-triangle" },
  { label: "App premium",    val: "2.1×",  stroke: "#534AB7", points: "0,16 9,15 18,14 28,12 37,10 46,8 56,6", delta: "app prices 110% higher", cls: "delta-up",  icon: "ti-device-mobile"  },
  { label: "Records",        val: "1,240", stroke: "#888780", points: "0,20 9,18 18,16 28,14 37,11 46,9 56,7", delta: "5 cities · 14 items",    cls: "delta-neu", icon: "ti-database"       },
];

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

function Dashboard() {
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
        {[
          ["All cities","Hyderabad","Mumbai","Delhi","Bengaluru","Chennai"],
          ["All items","Biryani","Vada pav","Dosa","Chai","Samosa"],
          ["All zones","Central","Suburban","Peripheral"],
          ["Apr – Jun 2025","Jan – Mar 2025","Oct – Dec 2024"],
        ].map((opts, i) => (
          <select key={i} className="fsel">
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <div className="fsep" />
        <button className="ftoggle on">App</button>
        <button className="ftoggle on">Street</button>
        <div className="fsep" />
        <button className="ftoggle on">Veg</button>
        <button className="ftoggle on">Non-veg</button>
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

        {/* Hero row — map (left 2/3) + bar chart (right 1/3) */}
        <div className="hero-row">
          <div className="card">
            <div className="ctitle">Price heat map — by city &amp; zone</div>
            <div className="csub">Average price (₹) across all selected items · darker = costlier</div>
            <div className="map-area">
              <i className="ti ti-map-2" style={{ fontSize: '22px', color: '#6b7280' }} aria-hidden="true" />
              <span>Choropleth renders here (Folium / Plotly)</span>
              <span style={{ fontSize: '10px' }}>Click any zone to filter dashboard</span>
            </div>
            <div className="scale-row">
              <span className="scale-label">₹18</span>
              <div className="scale-bar" />
              <span className="scale-label">₹280</span>
              <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '6px' }}>· 5 cities mapped</span>
            </div>
          </div>

          <div className="card">
            <div className="ctitle">Avg price by item</div>
            <div className="csub">Street stalls · all cities</div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={foodPrices} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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