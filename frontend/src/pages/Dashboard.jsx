import { kpiData } from "../data/dummyData";
import { cityPrices } from "../data/dummyData";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function Dashboard() {
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
      }}
    >
      <h1>Final Dashboard Layout</h1>

      {/* Topbar */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        Topbar
      </div>

      {/* Filters */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        Filters
      </div>

      {/* KPI Row */}  <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div style={cardStyle}>
  <h3>Avg Price</h3>
  <p>₹{kpiData.avgOrderPrice}</p>
</div>

<div style={cardStyle}>
  <h3>Most Expensive</h3>
  <p>{kpiData.highestCity}</p>
</div>

<div style={cardStyle}>
  <h3>Cheapest</h3>
  <p>{kpiData.lowestCity}</p>
</div>

<div style={cardStyle}>
  <h3>Records</h3>
  <p>{kpiData.totalRecords}</p>
</div>
      </div>

      {/* Row 1 */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={chartStyle}>Price Heat Map</div>
        <div style={chartStyle}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={cityPrices}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="city" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="avgPrice" />
    </BarChart>
  </ResponsiveContainer>
</div>
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={chartStyle}>Inflation Trend</div>
        <div style={chartStyle}>City Comparison</div>
      </div>

      {/* AI Insights */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          minHeight: "120px",
        }}
      >
        AI Insights
      </div>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  border: "1px solid #ddd",
  padding: "20px",
  textAlign: "center",
};

const chartStyle = {
  flex: 1,
  border: "1px solid #ddd",
  height: "300px",
  padding: "10px",
};

export default Dashboard;