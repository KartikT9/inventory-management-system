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
            textAlign: "center",
          marginBottom: "30px",
          fontSize: "48px",
          color: "#1f2937",
        }}
      >
        📦 Products
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
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
            style={inputStyle}
          />

          <input
            required
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
            style={inputStyle}
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
            style={inputStyle}
          />

          <input
            type="number"
            min="0"
            required
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={primaryButton}
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              style={cancelButton}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Product List</h3>

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
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>

                <td>
                  <button
                    onClick={() =>
                      editProduct(product)
                    }
                    style={editButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    style={deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  boxSizing: "border-box",
};

const primaryButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
};

const cancelButton = {
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const editButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Products;