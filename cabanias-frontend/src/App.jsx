import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CalendarioPage from "./pages/CalendarioPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          🏡 Luluni Cabañas
        </h1>

        <nav className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Inicio
          </Link>

          <Link
            to="/calendario/1"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Calendario Cabaña 1
          </Link>

          <Link
            to="/calendario/2"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Calendario Cabaña 2
          </Link>

          <Link
            to="/calendario/3"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Calendario Cabaña 3
          </Link>
        </nav>
      </div>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario/:id" element={<CalendarioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
