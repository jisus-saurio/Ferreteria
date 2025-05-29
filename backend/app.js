// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewRoutes from "./src/routes/reviews.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoutes from "./src/routes/login.js";
import cookieParser from 'cookie-parser';
import logoutRoutes from "./src/routes/logout.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providersRoutes from "./src/routes/providers.js";
import cors from 'cors';

//s
// Creo una constante que es igual a la libreria que importé
const app = express();
//s// Importo la libreria cors

app.use(cors({
    origin: 'https://ferreteria-j0s7.onrender.com', // Cambia esto por la URL de tu frontend
    credentials: true, // Permite el envío de cookies
}));
//Que acepte datos en json
app.use(express.json());

app.use(cookieParser());    

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/RecoverPassword", recoveryPasswordRoutes);
app.use("/api/providers", providersRoutes);
export default app;
