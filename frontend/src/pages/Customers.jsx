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

    try {
      await api.post("/customers", {
        full_name: fullName,
        email,
        phone,
      });

      setFullName("");
      setEmail("");
      setPhone("");

      loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Failed to create customer");
    }
  }

  async function deleteCustomer(id) {
    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Customers</h2>

      <form onSubmit={addCustomer}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

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
                    deleteCustomer(customer.id)
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