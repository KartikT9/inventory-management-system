import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "14px 18px",
    borderRadius: "12px",
    background:
      location.pathname === path
        ? "#2563eb"
        : "#1e293b",
    fontWeight: "600",
    transition: "0.3s",
    display: "block",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#111827",
          padding: "25px",
          boxSizing: "border-box",
          borderRight: "1px solid #374151",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          📦 Inventory
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Link to="/" style={linkStyle("/")}>
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
          background: "#0f172a",
          color: "white",
          overflowX: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;