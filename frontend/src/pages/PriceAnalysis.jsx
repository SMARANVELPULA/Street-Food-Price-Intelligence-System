import React from "react";
import "./PriceAnalysis.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  foodPrices,
  cityComparison,
  appVsStreetPrices,
  dashboardKPIs,
} from "../data/dummyData";
import {
  getItemAverages,
  getMostExpensive,
  getCheapest,
  getHighestPremium,
} from "../utils/dataCalculations";

function PriceAnalysis() {
  const itemComparisonData = getItemAverages(foodPrices);
  const mostExpensive = getMostExpensive(foodPrices);
  const cheapest = getCheapest(foodPrices);
  const highestPremium = getHighestPremium(appVsStreetPrices);
  const averageMealCost = `₹${dashboardKPIs.avgPrice}`;

  // Prepare App vs Street comparison data
  const appVsStreetData = appVsStreetPrices.map(item => ({
    city: item.city,
    Street: item.street,
    App: item.app,
    Premium: ((item.app / item.street - 1) * 100).toFixed(1),
  }));

  // Prepare table data with all items
  const tableData = appVsStreetPrices.map(item => ({
    city: item.city,
    street: item.street,
    app: item.app,
    premiumPercent: ((item.app / item.street - 1) * 100).toFixed(1),
    premiumMultiple: (item.app / item.street).toFixed(2),
  }));

  return (
    <div style={{ flex: 1, padding: "20px", background: "#f4f5f7", minHeight: "100vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "8px", fontSize: "28px", fontWeight: "600" }}>Price Analysis</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>Comprehensive street food pricing insights & city comparisons</p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div className="kpi-card">
          <div className="kpi-label">Most Expensive Item</div>
          <div className="kpi-value">{mostExpensive.item}</div>
          <div className="kpi-sub">₹{mostExpensive.avg.toFixed(0)} average</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Cheapest Item</div>
          <div className="kpi-value">{cheapest.item}</div>
          <div className="kpi-sub">₹{cheapest.avg.toFixed(0)} average</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Average Meal Cost</div>
          <div className="kpi-value">{averageMealCost}</div>
          <div className="kpi-sub">Across all cities</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Highest App Premium</div>
          <div className="kpi-value">{highestPremium.city}</div>
          <div className="kpi-sub">{highestPremium.premium.toFixed(1)}× premium</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* Item Price Comparison */}
        <div className="chart-card">
          <h3 className="chart-title">Item Price Comparison</h3>
          <p className="chart-subtitle">Average street prices across cities</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={itemComparisonData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="item" tick={{ fontSize: 11, fill: "#6b7280" }} angle={-45} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Tooltip
                formatter={(v) => [`₹${v.toFixed(0)}`, "Avg Price"]}
                contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "0.5px solid #e5e7eb" }}
              />
              <Bar dataKey="avg" fill="#1D9E75" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* City-wise Price Comparison */}
        <div className="chart-card">
          <h3 className="chart-title">City-wise Price Comparison</h3>
          <p className="chart-subtitle">Average meal prices by city</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityComparison} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Tooltip
                formatter={(v) => [`₹${v}`, "Avg Price"]}
                contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "0.5px solid #e5e7eb" }}
              />
              <Bar dataKey="avgPrice" fill="#378ADD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* App vs Street Price Comparison */}
        <div className="chart-card">
          <h3 className="chart-title">App vs Street Price Comparison</h3>
          <p className="chart-subtitle">Price difference by city (Grouped)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={appVsStreetData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Tooltip
                formatter={(v) => [`₹${v}`, "Price"]}
                contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "0.5px solid #e5e7eb" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
              <Bar dataKey="Street" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              <Bar dataKey="App" fill="#D85A30" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Premium Percentage Chart */}
        <div className="chart-card">
          <h3 className="chart-title">App Premium by City</h3>
          <p className="chart-subtitle">Price markup percentage</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={appVsStreetData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <YAxis dataKey="city" type="category" tick={{ fontSize: 11, fill: "#6b7280" }} width={80} />
              <Tooltip
                formatter={(v) => [`${v}%`, "Premium"]}
                contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "0.5px solid #e5e7eb" }}
              />
              <Bar dataKey="Premium" fill="#534AB7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="chart-card">
        <h3 className="chart-title">Price Comparison Summary</h3>
        <p className="chart-subtitle">Street vs App pricing across cities</p>
        <div style={{ overflowX: "auto" }}>
          <table className="price-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Street Price (₹)</th>
                <th>App Price (₹)</th>
                <th>Premium %</th>
                <th>Premium Multiple</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                  <td className="table-city">{row.city}</td>
                  <td className="table-value">₹{row.street}</td>
                  <td className="table-value" style={{ color: "#D85A30", fontWeight: "600" }}>₹{row.app}</td>
                  <td className="table-premium">
                    <span className="premium-badge">{row.premiumPercent}%</span>
                  </td>
                  <td className="table-value">{row.premiumMultiple}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PriceAnalysis;