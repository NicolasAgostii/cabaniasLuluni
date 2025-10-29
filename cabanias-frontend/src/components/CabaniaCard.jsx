import { useNavigate } from "react-router-dom";

export default function CabaniaCard({ cabania }) {
  const navigate = useNavigate();
  const img = cabania?.fotoUrls?.[0] ?? "";

  const handleClick = () => {
    navigate(`/calendario/${cabania.id}`); // usa el id de la cabaña
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-lg p-4 w-64 hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      <img
        src={img}
        alt="foto"
        className="w-full h-40 object-cover rounded-md bg-gray-100"
      />
      <h3 className="font-semibold text-gray-800 mt-2">{cabania.descripcion}</h3>
      <p className="text-sm text-gray-600">
        Capacidad: {cabania.capacidad} personas
      </p>
      <p className="text-indigo-600 font-bold mt-1">${cabania.precio}</p>
    </div>
  );
}
