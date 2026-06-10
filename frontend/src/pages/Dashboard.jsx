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
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div>
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>

        <div>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>

      <h3>Low Stock Products</h3>

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