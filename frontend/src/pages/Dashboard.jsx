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
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#1f2937",
        }}
      >
        Inventory Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h3>📦 Total Products</h3>
          <h1>{products.length}</h1>
        </div>

        <div
          style={{
            background: "#16a34a",
            color: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h3>👥 Total Customers</h3>
          <h1>{customers.length}</h1>
        </div>

        <div
          style={{
            background: "#ea580c",
            color: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h3>🛒 Total Orders</h3>
          <h1>{orders.length}</h1>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
            color: "#dc2626",
          }}
        >
          ⚠ Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
          <p>No low stock products.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f3f4f6",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Product
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  SKU
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.map(
                (product) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom:
                        "1px solid #e5e7eb",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {product.name}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {product.sku}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        color: "#dc2626",
                        fontWeight: "bold",
                      }}
                    >
                      {product.quantity}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;