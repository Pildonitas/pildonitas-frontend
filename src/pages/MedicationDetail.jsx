import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicationById, deleteMedication } from "../services/TestServices";
import Button from "../components/Button";

const MedicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [med, setMed] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del medicamento
  useEffect(() => {
    const fetchMed = async () => {
      try {
        const data = await getMedicationById(id);
        setMed(data);
      } catch (err) {
        console.error("Error cargando medicamento:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMed();
  }, [id]);

  // Eliminar medicamento
  const handleDelete = async () => {
    try {
      await deleteMedication(id);
      navigate("/medicationslist");
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!med) return <p>No se encontró el medicamento</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6 space-y-3">
      <h2 className="text-2xl font-bold">{med.name}</h2>

      <p><strong>Dosis:</strong> {med.dosis}</p>
      <p><strong>Frecuencia:</strong> {med.frequency}</p>
      <p><strong>Próxima toma:</strong> {med.nextDose || '-'}</p>
      <p><strong>Última toma:</strong> {med.lastDose || '-'}</p>
      <p><strong>Estado:</strong> {med.status}</p>
      <p><strong>Notas:</strong> {med.notes || '-'}</p>
      <p><strong>Información importante:</strong> {med.important || '-'}</p>

      <div className="flex gap-3 mt-6">
        <Button
          title="Editar"
          action={() => navigate(`/edit-medication/${id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        />
        <Button
          title="Eliminar"
          action={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        />
      </div>
    </div>
  );
};

export default MedicationDetail;
