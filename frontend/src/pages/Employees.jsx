import React, { useState, useEffect } from "react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    address: "",
    password: "",
    hireDate: "",
    telephone: "",
    dui: "",
    isVerified: false,
    issnumber: "",
  });

  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://ferreteria-j0s7.onrender.com/api/employee");
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    if (["dui", "telephone"].includes(e.target.name)) {
      value = value.replace(/[^0-9]/g, "");
    }

    if (["birthday", "hireDate"].includes(e.target.name)) {
      value = new Date(value).toISOString().split("T")[0];
    }

    if (e.target.name === "isVerified") {
      value = e.target.checked;
    }

    setNewEmployee({ ...newEmployee, [e.target.name]: value || "" });
  };

  const addOrUpdateEmployee = async () => {
    const method = editingEmployeeId ? "PUT" : "POST";
    const url = editingEmployeeId
      ? `https://ferreteria-j0s7.onrender.com/api/employee/${editingEmployeeId}`
      : "https://ferreteria-j0s7.onrender.com/api/employee";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      await fetchEmployees();
      resetForm();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`https://ferreteria-j0s7.onrender.com/api/employee/${id}`, {
        method: "DELETE",
      });
      await fetchEmployees();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  const startEditing = (employee) => {
    setNewEmployee({
      name: employee.name || "",
      lastName: employee.lastName || "",
      email: employee.email || "",
      address: employee.address || "",
      telephone: employee.telephone || "",
      dui: employee.dui || "",
      isVerified: employee.isVerified || false,
    });
    setEditingEmployeeId(employee._id);
  };

  const resetForm = () => {
    setEditingEmployeeId(null);
    setNewEmployee({
      name: "",
      lastName: "",
      birthday: "",
      email: "",
      address: "",
      password: "",
      hireDate: "",
      telephone: "",
      dui: "",
      isVerified: false,
      issnumber: "",
    });
  };

  return (
    <div style={styles.container}>
      <h1>Gestión de Empleados</h1>

      <div style={styles.formCard}>
        <h2>{editingEmployeeId ? "Actualizar" : "Agregar"} Empleado</h2>
        <div style={styles.form}>
          {Object.keys(newEmployee)
            .filter(
              (key) =>
                !editingEmployeeId ||
                [
                  "name",
                  "lastName",
                  "email",
                  "address",
                  "telephone",
                  "dui",
                  "isVerified",
                ].includes(key)
            )
            .map((key) => (
              <div key={key} style={styles.formField}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type={
                    key === "isVerified"
                      ? "checkbox"
                      : ["birthday", "hireDate"].includes(key)
                      ? "date"
                      : "text"
                  }
                  name={key}
                  value={key === "isVerified" ? undefined : newEmployee[key]}
                  checked={key === "isVerified" ? newEmployee[key] : undefined}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            ))}
          <button onClick={addOrUpdateEmployee} style={styles.addButton}>
            {editingEmployeeId ? "Actualizar" : "Agregar"} Empleado
          </button>
        </div>
      </div>

      <h2>Lista de Empleados</h2>
      <div style={styles.employeeList}>
        {employees.map((employee) => (
          <div key={employee._id} style={styles.card}>
            <h3>
              {employee.name} {employee.lastName}
            </h3>
            <p>Email: {employee.email}</p>
            <p>Teléfono: {employee.telephone}</p>
            <p>Verificado: {employee.isVerified ? "Sí" : "No"}</p>
            <button
              onClick={() => startEditing(employee)}
              style={styles.updateButton}
            >
              Actualizar
            </button>
            <button
              onClick={() => deleteEmployee(employee._id)}
              style={styles.deleteButton}
            >
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
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  formField: { display: "flex", flexDirection: "column", textAlign: "left" },
  label: { fontWeight: "bold", marginBottom: "5px", color: "#333" },
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
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  employeeList: {
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
  },
  updateButton: {
    background: "#ffc107",
    color: "white",
    padding: "8px",
    marginBottom: "5px",
    marginRight: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Employees;
