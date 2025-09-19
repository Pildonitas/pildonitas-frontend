import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicationById, deleteMedication } from "../services/MedicationServices";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

const MedicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Cargar datos del medicamento
  useEffect(() => {
    const fetchMed = async () => {
      try {
        const data = await getMedicationById(id);
        setMedication(data);
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
  if (!medication) return <p>No se encontró el medicamento</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6 space-y-3">
      <h2 className="text-2xl font-bold">{medication.name}</h2>

      <p><strong>Dosis:</strong> {medication.dosis}</p>
      <p><strong>Frecuencia:</strong> {medication.frequency}</p>
      <p><strong>Próxima toma:</strong> {medication.nextDose || '-'}</p>
      <p><strong>Última toma:</strong> {medication.lastDose || '-'}</p>
      <p><strong>Estado:</strong> {medication.status}</p>
      <p><strong>Notas:</strong> {medication.notes || '-'}</p>
      <p><strong>Información importante:</strong> {medication.important || '-'}</p>

      <div className="flex gap-3 mt-6">
        <Button
          title="Editar"
          action={() => navigate(`/edit-medication/${id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        />
        <Button
          title="Eliminar"
          action={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        />
        <Button
          title="Volver a la lista"
          action={() => navigate("/medicationslist")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        />

        <ConfirmModal
          isOpen={isModalOpen}
          title="Eliminar medicamento"
          message="¿Estás seguro de que quieres eliminar este medicamento?"
          onConfirm={async () => {
            try {
              await deleteMedication(id);
              navigate("/medicationslist");
            } catch (err) {
              console.error("Error eliminando:", err);
            }
          }}
          onCancel={() => setIsModalOpen(false)}
        />


      </div>
    </div>
  );
};

export default MedicationDetail;
