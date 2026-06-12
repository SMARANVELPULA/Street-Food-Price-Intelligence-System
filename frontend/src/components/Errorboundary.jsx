import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console (or send to a logging service) for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "24px",
            margin: "20px",
            border: "1px solid #FEE2E2",
            background: "#FEF2F2",
            borderRadius: "8px",
            color: "#991B1B",
            fontFamily: "sans-serif",
          }}
        >
          <h3 style={{ margin: "0 0 8px" }}>Something went wrong</h3>
          <p style={{ margin: 0, fontSize: "13px" }}>
            {this.state.error?.message || "An unexpected error occurred while rendering this section."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;