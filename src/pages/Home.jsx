import React, { useState, useEffect } from "react";
import MedicationCarousel from "../components/MedsCarousel";
import { getMedication } from "../services/MedicationServices";

import { User } from "lucide-react";

const Home = ({ userName = "Usuario" }) => {
  const [medications, setMedications] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Cargar medicamentos
  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const meds = await getMedication();
        setMedications(meds);
      } catch (err) {
        console.error("Error cargando medicamentos:", err);
      }
    };
    fetchMeds();
  }, []);

  // Actualizar hora en tiempo real
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nextMed = medications
    .filter((med) => med.status !== "tomado")
  medications.sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  });



  return (
    <div className="p-6 space-y-6">
      {/* Header estilizado */}
      <header className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center md:justify-between">
        <div>

          <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold drop-shadow-md">
            Hola, {userName}!
            <User className="w-8 h-8 text-blue-900" />
          </h1>

          <p className="mt-1 text-lg md:text-xl drop-shadow-sm">
            Hoy es {formattedDate}, {formattedTime}
          </p>
          {nextMed && (
            <p className="mt-2 bg-white/50 backdrop-blur-sm inline-block px-3 py-1 rounded font-semibold text-blue-800">
              Próxima toma: {nextMed.name} a las {nextMed.nextDose}
            </p>
          )}
        </div>
      </header>

      <br />
      <div>
        <p className="mt-4 md:mt-0 md:text-lg font-bold text-black/90">
          Estos son tus medicamentos para hoy:
        </p>
      </div>

      {/* Carrusel */}
      <MedicationCarousel medications={medications.filter(m=>m.status !== "tomado")} />
    </div>
  );
};

export default Home;
