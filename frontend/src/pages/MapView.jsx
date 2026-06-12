function MapView() {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ marginBottom: "8px" }}>Map View</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Interactive geographical mapping of street food prices by city and zone
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Price Heat Map</h3>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 20px 0" }}>
          Average price (₹) across all items · darker = costlier
        </p>

        <div
          style={{
            height: "400px",
            background: "#F9FAFB",
            border: "1px dashed #d1d5db",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "12px",
            color: "#6b7280",
          }}
        >
          <i className="ti ti-map-2" style={{ fontSize: "32px" }} aria-hidden="true" />
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Choropleth renders here</span>
          <span style={{ fontSize: "12px" }}>(Folium / Plotly integration)</span>
          <span style={{ fontSize: "11px", marginTop: "8px" }}>Click any zone to filter dashboard</span>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
          }}
        >
          <span style={{ color: "#6b7280" }}>₹18</span>
          <div
            style={{
              height: "20px",
              flex: 1,
              background: "linear-gradient(to right, #e0f2f1, #1D9E75, #d85a30, #a32d2d)",
              borderRadius: "3px",
            }}
          />
          <span style={{ color: "#6b7280" }}>₹280</span>
          <span style={{ color: "#6b7280", fontSize: "11px", marginLeft: "8px" }}>· 5 cities mapped</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Most Affordable</div>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>Chennai</div>
          <div style={{ fontSize: "11px", color: "#085041", marginTop: "6px" }}>17% below median</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Highest Prices</div>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>Mumbai</div>
          <div style={{ fontSize: "11px", color: "#A32D2D", marginTop: "6px" }}>+18% above median</div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Zone Gap</div>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>34%</div>
          <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>Central vs Peripheral</div>
        </div>
      </div>
    </div>
  );
}

export default MapView;