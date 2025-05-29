import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Employees from "./pages/Employees";
import Customers from "./pages/customers";
import Home from "./pages/Home";
import Products from "./pages/Product";
//creo que ya esta
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;