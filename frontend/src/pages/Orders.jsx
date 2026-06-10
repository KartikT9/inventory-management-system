import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addOrder(e) {
    e.preventDefault();

    try {
      await api.post("/orders", {
        customer_id: Number(customerId),
        product_id: Number(productId),
        quantity: Number(quantity),
      });

      setCustomerId("");
      setProductId("");
      setQuantity("");

      loadOrders();
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.detail ||
        "Failed to create order"
      );
    }
  }

  async function deleteOrder(id) {
    try {
      await api.delete(`/orders/${id}`);
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Orders</h2>

      <form onSubmit={addOrder}>
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Create Order
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>{order.total_amount}</td>

              <td>
                <button
                  onClick={() =>
                    deleteOrder(order.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;