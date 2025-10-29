import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiaCard from "../components/DiaCard";
import {
  reservarDiaCompleto,
  reservarManiana,
  reservarTarde,
} from "../services/ReservaService";

export default function CalendarioPage() {
  const { id } = useParams();
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState(null);
  const [meses, setMeses] = useState([]);
  const [selectedDia, setSelectedDia] = useState(null);
  const [turno, setTurno] = useState("mañana");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");

  useEffect(() => {
    fetchAnios();
  }, [id]);

  async function fetchAnios() {
    try {
      const res = await fetch(`http://localhost:8080/api/calendarios/${id}/anios`);
      const data = await res.json();
      setAnios(data);
      if (data.length > 0) {
        setSelectedAnio(data[0]);
        await fetchMesesPorAnio(data[0]);
      }
    } catch (error) {
      console.error("Error al obtener los años:", error);
    }
  }

  async function fetchMesesPorAnio(anio) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/calendarios/${id}/anios/${anio}/meses`
      );
      const data = await res.json();
      setMeses(data);
    } catch (error) {
      console.error("Error al obtener los meses:", error);
    }
  }

  async function handleSelectAnio(anio) {
    setSelectedAnio(anio);
    await fetchMesesPorAnio(anio);
  }

  async function handleReservaSubmit(e) {
    e.preventDefault();
    if (!selectedDia) return;

    if (turno === "mañana") {
      await reservarManiana(selectedDia.id, nombre, contacto);
    } else if (turno === "tarde") {
      await reservarTarde(selectedDia.id, nombre, contacto);
    } else {
      await reservarDiaCompleto(selectedDia.id, nombre, contacto);
    }

    setSelectedDia(null);
    setNombre("");
    setContacto("");

    // refresca los meses del año actual
    await fetchMesesPorAnio(selectedAnio);
  }

  return (
    <div className="p-8 min-h-screen bg-gray-300">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">
        Calendario de Reservas (Cabaña {id})
      </h1>

      {/* 🔹 Sección de años */}
      <div className="flex justify-center gap-6 mb-8">
        {anios.map((anio) => (
          <button
            key={anio}
            onClick={() => handleSelectAnio(anio)}
            className={`px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition-all ${
              selectedAnio === anio
                ? "bg-indigo-600 text-white scale-110"
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
          >
            {anio}
          </button>
        ))}
      </div>

      {/* 🔹 Contenido del calendario */}
      <div className="flex flex-col gap-10">
        {meses.map((mes) => (
          <div
            key={mes.id}
            className="rounded-2xl shadow-lg p-6 border border-gray-500"
            style={{ backgroundColor: "#a9a9a9" }}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">
              {mes.nombre} ({selectedAnio})
            </h2>

            <div className="grid grid-cols-7 gap-3">
              {mes.dias?.map((dia) => (
                <DiaCard key={dia.id} dia={dia} onSelect={setSelectedDia} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal de reserva */}
      {selectedDia && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Reservar día {selectedDia.numero} ({selectedAnio})
            </h2>

            <form onSubmit={handleReservaSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">Turno</label>
              <select
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="completo">Completo</option>
              </select>

              <label className="text-sm font-medium text-gray-700">
                Nombre del inquilino
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                required
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              />

              <label className="text-sm font-medium text-gray-700">
                Número de contacto
              </label>
              <input
                type="text"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                placeholder="Ej: 1122334455"
                required
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedDia(null)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Confirmar reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
