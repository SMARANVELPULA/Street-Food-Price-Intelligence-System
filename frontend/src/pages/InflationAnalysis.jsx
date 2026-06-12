import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { inflationData } from "../data/dummyData";

function InflationAnalysis() {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ marginBottom: "8px" }}>Inflation Analysis</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Historical trends and comparison against CPI · Street Food Price Index vs official inflation
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Inflation Trend</h3>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 16px 0" }}>
          Monthly index · Jan 2025 = 100
        </p>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={inflationData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} domain={[98, 116]} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line
              type="monotone"
              dataKey="sfpi"
              name="SFPI"
              stroke="#D85A30"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cpi"
              name="CPI food"
              stroke="#378ADD"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="appIndex"
              name="App index"
              stroke="#888780"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            background: "#F3F4F6",
            borderRadius: "6px",
            fontSize: "13px",
            color: "#374151",
          }}
        >
          <i className="ti ti-flask" style={{ fontSize: "10px", marginRight: "6px" }} aria-hidden="true" />
          Granger test p = 0.031 — SFPI leads CPI by ~3 weeks
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>SFPI Inflation</div>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#D85A30" }}>8.4%</div>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>+3.3 pp above CPI food</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>CPI Food</div>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#378ADD" }}>5.1%</div>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>Official inflation rate</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>App Index Premium</div>
          <div style={{ fontSize: "24px", fontWeight: "600", color: "#888780" }}>+2.1%</div>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>vs street stalls</div>
        </div>
      </div>
    </div>
  );
}

export default InflationAnalysis;