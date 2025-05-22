import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Mi Sitio</h1>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}><Link style={styles.navLink} to="/">Inicio</Link></li>
        <li style={styles.navItem}><Link style={styles.navLink} to="/employees">Empleados</Link></li>
        <li style={styles.navItem}><Link style={styles.navLink} to="/customers">Usuarios</Link></li>
        <li style={styles.navItem}><Link style={styles.navLink} to="/products">Productos</Link></li> {/* Nueva sección de productos */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
  },
  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    marginRight: "1rem",
  },
  navItem: {},
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "background 0.3s",
  }
};

export default Navbar;