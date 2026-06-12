import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { inflationData, cityComparison, categoryInflation, itemInflation } from "../data/dummyData";
import "./InflationAnalysis.css";

function InflationAnalysis() {
  // Calculate current values
  const currentSFPI = useMemo(() => {
    const latest = inflationData[inflationData.length - 1];
    return latest.sfpi;
  }, []);

  const currentCPI = useMemo(() => {
    const latest = inflationData[inflationData.length - 1];
    return latest.cpi;
  }, []);

  const inflationGap = useMemo(() => {
    return Math.round((currentSFPI - currentCPI) * 10) / 10;
  }, [currentSFPI, currentCPI]);

  const highestInflationCity = useMemo(() => {
    return cityComparison.reduce((max, city) =>
      city.inflation > max.inflation ? city : max
    );
  }, []);

  const highestInflationItem = useMemo(() => {
    return itemInflation.reduce((max, item) =>
      item.inflation > max.inflation ? item : max
    );
  }, []);

  // Calculate YoY inflation rates
  const sfpiYoY = 8.4;
  const cpiYoY = 5.1;

  // KPI cards
  const kpis = [
    {
      label: "Current SFPI",
      value: `₹${currentSFPI}`,
      subtext: `+${sfpiYoY}% YoY`,
      color: "#D85A30",
      icon: "ti-trending-up",
    },
    {
      label: "CPI Food",
      value: `${cpiYoY}%`,
      subtext: "Official inflation",
      color: "#378ADD",
      icon: "ti-chart-bar",
    },
    {
      label: "Inflation Gap",
      value: `+${inflationGap}%`,
      subtext: `SFPI vs CPI`,
      color: "#A32D2D",
      icon: "ti-alert-triangle",
    },
    {
      label: "Highest City",
      value: `${highestInflationCity.city}`,
      subtext: `${highestInflationCity.inflation}% inflation`,
      color: "#1D9E75",
      icon: "ti-map-pin",
    },
  ];

  // Prepare data for monthly trend
  const monthlyTrend = inflationData.map(d => ({
    month: d.month,
    sfpi: d.sfpi,
    cpi: d.cpi,
    gap: d.sfpi - d.cpi,
  }));

  // FIXED BUG: Spread operator creates a shallow copy to prevent read-only mutation errors
  const cityInflationData = [...cityComparison]
    .sort((a, b) => b.inflation - a.inflation)
    .slice(0, 5);

  // Insights
  const insights = [
    {
      title: "SFPI leads CPI by 3 weeks",
      description: `Street Food Price Index inflation (${sfpiYoY}%) is consistently ahead of official CPI food inflation (${cpiYoY}%), indicating street food serves as an early indicator of broader food price trends.`,
      icon: "ti-flask",
      bgColor: "#FEF3E2",
      iconColor: "#854F0B",
    },
    {
      title: `${highestInflationCity.city} sees highest inflation`,
      description: `${highestInflationCity.city} leads with ${highestInflationCity.inflation}% YoY inflation, driven by higher raw material costs and transportation in that region.`,
      icon: "ti-map-pin",
      bgColor: "#E1F5EE",
      iconColor: "#085041",
    },
    {
      title: `${highestInflationItem.item} prices jumped ${highestInflationItem.change}`,
      description: `${highestInflationItem.item} experienced the steepest price increase among all items tracked, reflecting supply chain pressures on specialty ingredients.`,
      icon: "ti-trending-up",
      bgColor: "#FCEBEB",
      iconColor: "#A32D2D",
    },
    {
      title: "Main course inflation outpacing snacks",
      description: "Main course items like Biryani and Dosa are seeing faster price growth (9.8%) compared to snacks (8.2%), suggesting input cost volatility in primary ingredients.",
      icon: "ti-cook",
      bgColor: "#E8F0FF",
      iconColor: "#3C3489",
    },
  ];

  return (
    <div className="inflation-page">
      {/* Header */}
      <div className="inflation-header">
        <h1 className="inflation-title">Inflation Analysis</h1>
        <p className="inflation-subtitle">
          Historical trends and comparison against CPI · Street Food Price Index vs official inflation
        </p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="kpi-icon" style={{ color: kpi.color }}>
              <i className={`ti ${kpi.icon}`} aria-hidden="true" />
            </div>
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value" style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className="kpi-subtext">{kpi.subtext}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        {/* SFPI vs CPI Trend */}
        <div className="card card-large">
          <div className="card-header">
            <h3 className="card-title">SFPI vs CPI Trend</h3>
            <p className="card-subtitle">Monthly index · Jan 2025 = 100</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={inflationData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} domain={[98, 116]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="sfpi" name="SFPI" stroke="#D85A30" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="cpi" name="CPI food" stroke="#378ADD" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="appIndex" name="App index" stroke="#888780" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="card-note">
            <i className="ti ti-flask" aria-hidden="true" /> Granger test p = 0.031 — SFPI leads CPI by ~3 weeks
          </div>
        </div>

        {/* Inflation by City */}
        <div className="card card-medium">
          <div className="card-header">
            <h3 className="card-title">Inflation by City</h3>
            <p className="card-subtitle">YoY growth rate</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityInflationData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="city" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }}
                formatter={(v) => [`${v}%`, "Inflation"]}
              />
              <Bar dataKey="inflation" fill="#1D9E75" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        {/* Inflation by Category */}
        <div className="card card-medium">
          <div className="card-header">
            <h3 className="card-title">Inflation by Category</h3>
            <p className="card-subtitle">Food type breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryInflation} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }}
                formatter={(v) => [`${v}%`, "Inflation"]}
              />
              <Bar dataKey="inflation" fill="#D85A30" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Inflation Trend */}
        <div className="card card-medium">
          <div className="card-header">
            <h3 className="card-title">Monthly Inflation Trend</h3>
            <p className="card-subtitle">Gap between SFPI and CPI</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }} />
              <Area type="monotone" dataKey="gap" fill="#D85A30" stroke="#D85A30" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 - Item Inflation */}
      <div className="charts-row">
        <div className="card card-large">
          <div className="card-header">
            <h3 className="card-title">Item Price Changes</h3>
            <p className="card-subtitle">YoY inflation by item</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={itemInflation} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="item" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 6, border: "0.5px solid #e5e7eb" }}
                formatter={(v) => [`${v}%`, "Inflation"]}
              />
              <Bar dataKey="inflation" fill="#534AB7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <div className="insights-header">
          <i className="ti ti-sparkles" aria-hidden="true" />
          <span className="insights-title">Key Insights</span>
          <span className="insights-badge">AI Generated</span>
        </div>

        <div className="insights-grid">
          {insights.map((insight, idx) => (
            <div key={idx} className="insight-item">
              <div className="insight-icon" style={{ background: insight.bgColor }}>
                <i className={`ti ${insight.icon}`} style={{ color: insight.iconColor }} aria-hidden="true" />
              </div>
              <div className="insight-content">
                <div className="insight-title">{insight.title}</div>
                <div className="insight-description">{insight.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InflationAnalysis;