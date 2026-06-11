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
    <div>
      <h2>Customers</h2>

      <form onSubmit={addCustomer}>
        <input
          required
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="email"
          required
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="tel"
          required
          maxLength="10"
          pattern="[0-9]{10}"
          title="Phone number must be exactly 10 digits"
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
        />

        <br />
        <br />

        <button type="submit">
          Add Customer
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>

              <td>
                <button
                  onClick={() =>
                    deleteCustomer(
                      customer.id
                    )
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

export default Customers;