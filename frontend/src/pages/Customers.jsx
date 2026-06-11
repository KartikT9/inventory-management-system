import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addCustomer(e) {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(
        "Please enter a valid email address"
      );
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert(
        "Phone number must be exactly 10 digits"
      );
      return;
    }

    try {
      await api.post("/customers", {
        full_name: fullName,
        email,
        phone,
      });

      setFullName("");
      setEmail("");
      setPhone("");

      await loadCustomers();

      alert("Customer created successfully");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Failed to create customer"
      );
    }
  }

  async function deleteCustomer(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/customers/${id}`);

      await loadCustomers();

      alert("Customer deleted successfully");
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
        👥 Customers
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
        <h3>Add Customer</h3>

        <form onSubmit={addCustomer}>
          <input
            required
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
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
            type="email"
            required
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
            type="tel"
            required
            maxLength="10"
            placeholder="9876543210"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
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
            Add Customer
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
        <h3>Customer List</h3>

        {customers.length === 0 ? (
          <p>No customers found.</p>
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
                  Email
                </th>
                <th style={{ padding: "12px" }}>
                  Phone
                </th>
                <th style={{ padding: "12px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {customer.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {customer.full_name}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {customer.email}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {customer.phone}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
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

export default Customers;