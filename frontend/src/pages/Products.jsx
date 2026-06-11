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
    <div>
      <h2>Products</h2>

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
        />

        <br />
        <br />

        <input
          required
          placeholder="SKU"
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
        />

        <br />
        <br />

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
        />

        <br />
        <br />

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
        />

        <br />
        <br />

        <button type="submit">
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>

        {editingId && (
          <>
            {" "}
            <button
              type="button"
              onClick={clearForm}
            >
              Cancel
            </button>
          </>
        )}
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
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
              <td>{product.price}</td>
              <td>{product.quantity}</td>

              <td>
                <button
                  onClick={() =>
                    editProduct(product)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() =>
                    deleteProduct(product.id)
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

export default Products;