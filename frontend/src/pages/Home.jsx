import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Bienvenido a Mi Sitio</h1>
      <p>Explora nuestra plataforma y gestiona empleados, usuarios y productos de manera eficiente.</p>
      <div style={styles.infoBox}>
        <h2>¿Qué puedes hacer aquí?</h2>
        <ul>
          <li>Ver la lista de empleados, usuarios y productos</li>
          <li>Agregar nuevos empleados, usuarios y productos</li>
          <li>Eliminar empleados, usuarios y productos de la base de datos</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  infoBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)"
  }
};

export default Home;