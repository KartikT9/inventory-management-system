import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "220px",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Inventory</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link to="/">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/orders">Orders</Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;