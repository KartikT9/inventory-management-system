import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "240px",
          backgroundColor: "#111827",
          color: "white",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            marginBottom: "35px",
            textAlign: "center",
          }}
        >
          📦 Inventory
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#1f2937",
            }}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/products"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#1f2937",
            }}
          >
            📦 Products
          </Link>

          <Link
            to="/customers"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#1f2937",
            }}
          >
            👥 Customers
          </Link>

          <Link
            to="/orders"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#1f2937",
            }}
          >
            🛒 Orders
          </Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "35px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;