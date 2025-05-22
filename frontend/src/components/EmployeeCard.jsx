import React from "react";

const EmployeeCard = ({ employee, onDelete, onUpdate }) => {
  return (
    <div style={styles.card}>
      <h3>{employee.name} {employee.lastName}</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Teléfono:</strong> {employee.telephone}</p>
      <div style={styles.buttonContainer}>
        <button onClick={() => onUpdate(employee)} style={styles.updateButton}>
          Actualizar
        </button>
        <button>Ola</button>
        <button onClick={() => onDelete(employee._id)} style={styles.deleteButton}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    width: "200px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    flex: "1 0 30%", 
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    gap: "10px", // Añadir espacio entre botones
  },
  updateButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "3px"
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "3px"
  }
};

export default EmployeeCard;