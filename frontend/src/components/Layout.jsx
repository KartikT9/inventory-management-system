import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "14px 16px",
    borderRadius: "10px",
    backgroundColor:
      location.pathname === path
        ? "#2563eb"
        : "#1f2937",
    transition: "0.3s",
    fontWeight:
      location.pathname === path
        ? "600"
        : "400",
    boxShadow:
      location.pathname === path
        ? "0 4px 10px rgba(37,99,235,0.35)"
        : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "250px",
          backgroundColor: "#111827",
          color: "white",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
            }}
          >
            📦 Inventory
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Management System
          </p>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Link
            to="/"
            style={linkStyle("/")}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/products"
            style={linkStyle("/products")}
          >
            📦 Products
          </Link>

          <Link
            to="/customers"
            style={linkStyle("/customers")}
          >
            👥 Customers
          </Link>

          <Link
            to="/orders"
            style={linkStyle("/orders")}
          >
            🛒 Orders
          </Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "35px",
          overflowX: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;