import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CabaniaCard from "../components/CabaniaCard";

export default function Home() {
  const [cabanias, setCabanias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cabanias")
      .then((res) => setCabanias(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: "#d1d5db" }}>
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Disponibilidad de Cabañas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {cabanias.map((c) => (
          <CabaniaCard key={c.id} cabania={c} />
        ))}
      </div>
    </div>
  );
}
