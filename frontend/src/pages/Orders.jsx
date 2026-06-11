import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const ordersRes = await api.get("/orders");
      const customersRes = await api.get("/customers");
      const productsRes = await api.get("/products");

      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addOrder(e) {
    e.preventDefault();

    if (Number(quantity) <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    try {
      await api.post("/orders", {
        customer_id: Number(customerId),
        product_id: Number(productId),
        quantity: Number(quantity),
      });

      setCustomerId("");
      setProductId("");
      setQuantity("");

      await loadData();

      alert("Order created successfully");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to create order"
      );
    }
  }

  async function deleteOrder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/orders/${id}`);

      await loadData();

      alert("Order deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          marginBottom: "25px",
          color: "#1f2937",
        }}
      >
        🛒 Orders
      </h1>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h3>Create Order</h3>

        <form onSubmit={addOrder}>
          <select
            required
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.id} - {customer.full_name}
              </option>
            ))}
          </select>

          <select
            required
            value={productId}
            onChange={(e) =>
              setProductId(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.id} - {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            required
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Order
          </button>
        </form>
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
        <h3>Order List</h3>

        {orders.length === 0 ? (
          <p>No orders found.</p>
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
                <th style={{ padding: "12px" }}>
                  ID
                </th>
                <th style={{ padding: "12px" }}>
                  Customer ID
                </th>
                <th style={{ padding: "12px" }}>
                  Product ID
                </th>
                <th style={{ padding: "12px" }}>
                  Quantity
                </th>
                <th style={{ padding: "12px" }}>
                  Total Amount
                </th>
                <th style={{ padding: "12px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {order.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {order.customer_id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {order.product_id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {order.quantity}
                  </td>

                  <td style={{ padding: "12px" }}>
                    ${order.total_amount}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;