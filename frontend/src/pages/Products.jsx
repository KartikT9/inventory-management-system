import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addProduct(e) {
    e.preventDefault();

    if (Number(price) < 0) {
      alert("Price cannot be negative");
      return;
    }

    if (Number(quantity) < 0) {
      alert("Quantity cannot be negative");
      return;
    }

    try {
      await api.post("/products", {
        name,
        sku,
        price: Number(price),
        quantity: Number(quantity),
      });

      clearForm();
      await loadProducts();

      alert("Product created successfully");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to create product"
      );
    }
  }

  async function updateProduct(e) {
    e.preventDefault();

    try {
      await api.put(`/products/${editingId}`, {
        name,
        sku,
        price: Number(price),
        quantity: Number(quantity),
      });

      clearForm();
      await loadProducts();

      alert("Product updated successfully");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to update product"
      );
    }
  }

  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);

      await loadProducts();

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  function editProduct(product) {
    setEditingId(product.id);

    setName(product.name);
    setSku(product.sku);
    setPrice(product.price);
    setQuantity(product.quantity);
  }

  function clearForm() {
    setEditingId(null);

    setName("");
    setSku("");
    setPrice("");
    setQuantity("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          marginBottom: "25px",
          color: "#1f2937",
        }}
      >
        📦 Products
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
        <h3>
          {editingId
            ? "Update Product"
            : "Add Product"}
        </h3>

        <form
          onSubmit={
            editingId
              ? updateProduct
              : addProduct
          }
        >
          <input
            required
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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

          <input
            required
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
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

          <input
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
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

          <input
            type="number"
            min="0"
            step="1"
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
              background: editingId
                ? "#16a34a"
                : "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              style={{
                background: "#6b7280",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
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
        <h3>Product List</h3>

        {products.length === 0 ? (
          <p>No products found.</p>
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
                  Name
                </th>
                <th style={{ padding: "12px" }}>
                  SKU
                </th>
                <th style={{ padding: "12px" }}>
                  Price
                </th>
                <th style={{ padding: "12px" }}>
                  Quantity
                </th>
                <th style={{ padding: "12px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {product.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {product.name}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {product.sku}
                  </td>

                  <td style={{ padding: "12px" }}>
                    ${product.price}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {product.quantity}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() =>
                        editProduct(product)
                      }
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product.id)
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

export default Products;