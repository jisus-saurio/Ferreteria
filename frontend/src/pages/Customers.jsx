import React, { useState, useEffect } from "react";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    telephone: "",
    dui: "",
    isVerified: false,
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const fetchCustomers = () => {
    fetch("https://ferreteria-j0s7.onrender.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error al obtener clientes:", error));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addOrUpdateCustomer = () => {
    const method = editingCustomerId ? "PUT" : "POST";
    const url = editingCustomerId
      ? `https://ferreteria-j0s7.onrender.com/api/customers/${editingCustomerId}`
      : "https://ferreteria-j0s7.onrender.com/api/customers";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then(() => {
        fetchCustomers();
        setNewCustomer({
          name: "",
          lastName: "",
          birthday: "",
          email: "",
          password: "",
          telephone: "",
          dui: "",
          isVerified: false,
        });
        setEditingCustomerId(null);
      })
      .catch((error) => console.error("Error al guardar cliente:", error));
  };

  const deleteCustomer = (id) => {
    fetch(`https://ferreteria-j0s7.onrender.com/api/customers/${id}`, { method: "DELETE" })
      .then(() => fetchCustomers())
      .catch((error) => console.error("Error al eliminar cliente:", error));
  };

  const editCustomer = (customer) => {
    setNewCustomer({
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      telephone: customer.telephone,
      dui: customer.dui,
    });
    setEditingCustomerId(customer._id);
  };

  const editableFields = ["name", "lastName", "email", "telephone", "dui"];

  return (
    <div style={styles.container}>
      <h1>Gestión de Clientes</h1>

      <div style={styles.formCard}>
        <h2>{editingCustomerId ? "Actualizar Cliente" : "Agregar Cliente"}</h2>
        <div style={styles.form}>
          {Object.keys(newCustomer)
            .filter((key) => !editingCustomerId || editableFields.includes(key))
            .map((key) => (
              <div key={key} style={styles.formField}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type={key === "birthday" ? "date" : key === "isVerified" ? "checkbox" : "text"}
                  name={key}
                  value={newCustomer[key] || ""}
                  checked={key === "isVerified" ? newCustomer[key] : undefined}
                  onChange={handleChange}
                />
              </div>
            ))}
          <button onClick={addOrUpdateCustomer} style={styles.addButton}>
            {editingCustomerId ? "Actualizar Cliente" : "Guardar Cliente"}
          </button>
        </div>
      </div>

      <h2>Lista de Clientes</h2>
      <div style={styles.customerList}>
        {customers.map((customer) => (
          <div key={customer._id} style={styles.card}>
            <h3>{customer.name} {customer.lastName}</h3>
            <p>Email: {customer.email}</p>
            <p>Teléfono: {customer.telephone}</p>
            <button onClick={() => editCustomer(customer)} style={styles.editButton}>
              Actualizar
            </button>
            <button onClick={() => deleteCustomer(customer._id)} style={styles.deleteButton}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  addButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
    boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
  },
  customerList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    width: "260px",
    textAlign: "center",
    transition: "0.3s",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  editButton: {
    background: "#ffc107",
    color: "white",
    border: "none",
    padding: "8px",
    marginRight: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};
export  default Customers;