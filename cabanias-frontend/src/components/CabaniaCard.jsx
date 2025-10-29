export default function CabaniaCard({ cabania }) {
  const img = cabania?.fotoUrls?.[0] ?? "";
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-64 hover:scale-105 transition-transform duration-200">
      <img
        src={img}
        alt="foto"
        className="w-full h-40 object-cover rounded-md bg-gray-100"
      />
      <h3 className="font-semibold text-gray-800 mt-2">{cabania?.descripcion ?? ""}</h3>
      <p className="text-sm text-gray-600">Capacidad: {cabania?.capacidad ?? 0} personas</p>
      <p className="text-indigo-600 font-bold mt-1">${cabania?.precio ?? 0}</p>
    </div>
  );
}
