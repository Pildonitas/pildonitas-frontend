import React, { useEffect, useState } from "react";
import Button from "./Button";
import { getMedicationById, updateMedication } from "../services/TestServices";
import { Link } from "react-router-dom";

const MedicationCard = ({ id, onUpdate }) => {
    const [medication, setMedication] = useState(null);
    const [loading, setLoading] = useState(true);

    // Traer datos de un medicamento específico
    useEffect(() => {
        const fetchMedication = async () => {
            try {
                const data = await getMedicationById(id);
                setMedication(data);
            } catch (error) {
                console.error("Error cargando el medicamento:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedication();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!medication) return <p>Error al cargar medicamento</p>;

    // --- función para estilos según estado ---
    const getCardStyle = (status) => {
        switch ((status || "").toLowerCase()) {
            case "tomado":
                return { badge: "bg-green-500", border: "border-green-300", background: "bg-green-50" };
            case "pendiente":
                return { badge: "bg-orange-500", border: "border-orange-300", background: "bg-orange-50" };
            case "retrasado":
                return { badge: "bg-red-500", border: "border-red-300", background: "bg-red-50" };
            default:
                return { badge: "bg-gray-500", border: "border-gray-300", background: "bg-gray-50" };
        }
    };

    const cardStyle = getCardStyle(medication.estado);

    // --- Función para marcar como tomado ---
    const handleMarkAsTaken = async () => {
        try {
            await updateMedication(id, { estado: "tomado" }); // Actualiza en el servicio simulado
            setMedication((prev) => ({ ...prev, estado: "tomado" })); // Actualiza el estado local
            if (onUpdate) onUpdate(id, "tomado"); // Notifica al padre si aplica
        } catch (error) {
            console.error("Error al marcar como tomado:", error);
        }
    };

    return (
        <div className={`${cardStyle.background} ${cardStyle.border} border-2 rounded-lg p-4 max-w-sm shadow-sm`}>
            {/* Header con nombre y estado */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
                    {medication.medicamento} {medication.dosis}
                </h3>
                <span
                    className={`${cardStyle.badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}
                >
                    {medication.estado}
                </span>
            </div>

            {/* Información del medicamento */}
            <div className="space-y-2 mb-4">
                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm">Frecuencia:</span>
                    <span className="text-gray-800 text-sm ml-1">{medication.frecuencia}</span>
                </div>
                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm min-w-20">Próxima toma:</span>
                    <span className="text-gray-800 text-sm ml-1">{medication.proximaToma}</span>
                </div>
                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm min-w-20">Última toma:</span>
                    <span className="text-gray-800 text-sm ml-1">{medication.ultimaToma}</span>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
                {medication.estado.toLowerCase() !== "tomado" && (
                    <Button
                        title="Marcar como tomado"
                        action={handleMarkAsTaken}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded"
                    />
                )}
                <Link to={`/viewmedication/${id}`}>
                    <Button
                        title="Ver más"
                        action={() => { }}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded"
                    />
                </Link>
            </div>
        </div>
    );
};

export default MedicationCard;
