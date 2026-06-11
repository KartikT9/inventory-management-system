import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const productsRes = await api.get("/products");
      const customersRes = await api.get("/customers");
      const ordersRes = await api.get("/orders");

      setProducts(productsRes.data);
      setCustomers(customersRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error(error);
    }
  }

  const lowStockProducts = products.filter(
    (product) => product.quantity < 10
  );

  return (
    <div>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Products</h3>
          <h1>{products.length}</h1>
        </div>

        <div
          style={{
            background: "#16a34a",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Customers</h3>
          <h1>{customers.length}</h1>
        </div>

        <div
          style={{
            background: "#ea580c",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Orders</h3>
          <h1>{orders.length}</h1>
        </div>
      </div>

      <h3
        style={{
          marginBottom: "15px",
        }}
      >
        Low Stock Products
      </h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;