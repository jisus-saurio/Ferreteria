import React from "react";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <button onClick={() => onDelete(product._id)} style={styles.deleteButton}>
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

export default ProductCard;