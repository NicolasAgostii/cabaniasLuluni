import React from "react";

export default function DiaCard({ dia, onSelect }) {
  const maniana = dia.ocupadoALaManiana;
  const tarde = dia.ocupadoALaTarde;

  const inquilinoManiana = dia.nombreInquilinoManiana || "";
  const contactoManiana = dia.numeroContactoManiana || "";
  const inquilinoTarde = dia.nombreInquilinoTarde || "";
  const contactoTarde = dia.numeroContactoTarde || "";

  const completo = maniana && tarde;
  const mismoInquilino =
    inquilinoManiana &&
    inquilinoTarde &&
    inquilinoManiana.trim().toLowerCase() ===
      inquilinoTarde.trim().toLowerCase();

  let background = "#bbf7d0"; // verde libre por defecto
  let estado = "Libre";

  if (completo && mismoInquilino) {
    background = "#ef4444"; // rojo fuerte si es el mismo inquilino todo el día
    estado = "Ocupado";
  } else if (maniana && tarde) {
    background = "linear-gradient(135deg, #facc15 50%, #fb923c 50%)"; // dos personas distintas
    estado = "Ocupado";
  } else if (maniana && !tarde) {
    background = "linear-gradient(135deg, #facc15 50%, #bbf7d0 50%)";
    estado = "Mañana";
  } else if (!maniana && tarde) {
    background = "linear-gradient(135deg, #bbf7d0 50%, #fb923c 50%)";
    estado = "Tarde";
  }

  return (
    <div
      onClick={() => onSelect(dia)}
      className={`relative w-36 h-36 rounded-xl shadow-md flex flex-col items-center justify-center text-center cursor-pointer transition hover:scale-105 ${
        completo && mismoInquilino ? "text-white" : "text-gray-800"
      }`}
      style={{ background }}
    >
      <p className="font-bold text-lg">{dia.numero}</p>

      {/* 🔴 Caso: mismo inquilino todo el día */}
      {completo && mismoInquilino ? (
        <>
          <p className="text-sm font-medium mb-1">{estado}</p>
          <p className="text-lg font-bold uppercase tracking-wide">
            {inquilinoManiana}
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-700 font-medium">{estado}</p>

          {/* Info de la mañana */}
          {maniana && (
            <div className="absolute left-1 top-1 text-[11px] text-gray-800 font-semibold w-[60%] leading-tight text-left bg-yellow-300/40 rounded-md px-1">
              <span className="block truncate">{inquilinoManiana}</span>
              <span className="block text-[10px] text-gray-700">
                {contactoManiana}
              </span>
            </div>
          )}

          {/* Info de la tarde */}
          {tarde && (
            <div className="absolute right-1 bottom-1 text-[11px] text-gray-800 font-semibold w-[60%] leading-tight text-right bg-orange-300/40 rounded-md px-1">
              <span className="block truncate">{inquilinoTarde}</span>
              <span className="block text-[10px] text-gray-700">
                {contactoTarde}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
