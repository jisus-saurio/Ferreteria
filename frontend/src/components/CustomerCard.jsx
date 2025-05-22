import React from "react";

const CustomerCard = ({ customer, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3>{customer.name} {customer.lastName}</h3>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Teléfono:</strong> {customer.telephone}</p>
      <button onClick={() => onDelete(customer._id)} style={styles.deleteButton}>
        Eliminar
      </button>
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
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
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

export default CustomerCard;