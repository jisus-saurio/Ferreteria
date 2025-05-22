import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    if (["price", "stock"].includes(e.target.name)) {
      value = value.replace(/[^0-9.]/g, "");
    }

    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const addOrUpdateProduct = () => {
    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `http://localhost:4000/api/products/${editingProductId}`
      : "http://localhost:4000/api/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        stock: parseInt(newProduct.stock, 10) || 0,
      }),
    })
      .then(() => {
        fetchProducts();
        setNewProduct({ name: "", description: "", price: "", stock: "" });
        setEditingProductId(null);
      })
      .catch((error) => console.error("Error al guardar producto:", error));
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:4000/api/products/${id}`, { method: "DELETE" })
      .then(() => fetchProducts())
      .catch((error) => console.error("Error al eliminar producto:", error));
  };

  const editProduct = (product) => {
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setEditingProductId(product._id);
  };

  const editableFields = ["name", "description", "price", "stock"];

  return (
    <div style={styles.container}>
      <h1>Gestión de Productos</h1>

      <div style={styles.formCard}>
        <h2>{editingProductId ? "Actualizar Producto" : "Agregar Producto"}</h2>
        <div style={styles.form}>
          {Object.keys(newProduct)
            .filter((key) => !editingProductId || editableFields.includes(key))
            .map((key) => (
              <div key={key} style={styles.formField}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type={["price", "stock"].includes(key) ? "number" : "text"}
                  name={key}
                  value={newProduct[key]}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            ))}
          <button onClick={addOrUpdateProduct} style={styles.addButton}>
            {editingProductId ? "Actualizar Producto" : "Guardar Producto"}
          </button>
        </div>
      </div>

      <h2>Lista de Productos</h2>
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <h3>{product.name}</h3>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <button onClick={() => editProduct(product)} style={styles.editButton}>
              Actualizar
            </button>
            <button onClick={() => deleteProduct(product._id)} style={styles.deleteButton}>
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
  productList: {
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
  editButton: {
    background: "#ffc107",
    color: "white",
    padding: "8px",
    marginBottom: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "5px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Products;