import React, { useState, useEffect, use } from "react";
import Button from "./Button";
//import { getMedicationById, deleteMedication, updateMedication } from "../services/MedicationServices";
import { Link } from "react-router-dom";
import { getMedicationById, updateMedication } from "../services/TestServices";

const MedicationCard = ({ id, onUpdate }) => {
    const [medication, setMedication] = useState(null);
    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMedication = async () => {
            setLoading(true);
            try {
                const data = await getMedicationById(id);
                setMedication(data);
            } catch (error) {
                console.error("Error al cargar el medicamento:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedication();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container p-4 border rounded shadow-sm text-center">
                <p>Cargando medicamento...</p>
            </div>
        )
    }

    if (!medication) {
        return (
            <div className="loading-container p-4 border rounded shadow-sm text-center text-red-500">
                <p>No se encontró el medicamento</p>
            </div>
        )
    }

    const { name, dosis, frequency, nextDose, lastDose, status = 'pendiente', notes, important } = medication;


// Función para obtener el color del estado y fondo de la carta
const getCardStyle = (status) => {
    switch (status.toLowerCase()) {
        case 'tomado':
            return {
                badge: 'bg-green-500',
                border: 'border-green-300',
                background: 'bg-green-50'
            };
        case 'pendiente':
            return {
                badge: 'bg-orange-500',
                border: 'border-orange-300',
                background: 'bg-orange-50'
            };
        case 'retrasado':
            return {
                badge: 'bg-red-500',
                border: 'border-red-300',
                background: 'bg-red-50'
            };
        default:
            return {
                badge: 'bg-gray-500',
                border: 'border-gray-300',
                background: 'bg-gray-50'
            };
    }
};

const cardStyle = getCardStyle(status);

//funciones de acción compartiendo estado de loading
const handleEliminar = async () => {
    setActionLoading(true);
    try {
        await deleteMedication(id);
        if (onUpdate) onUpdate();
    } catch (error) {
        console.error("Error al eliminar el medicamento:", error);
    } finally {
        setActionLoading(false);
    }
};

const handleMarcarComoTomado = async () => {
    setActionLoading(true);
    try {
        await updateMedication(id, { ...medication, status: 'tomado' });
        setMedication((prev) => ({ ...prev, status: 'tomado' }));
        if (onUpdate) onUpdate();
    } catch (error) {
        console.error("Error al marcar el medicamento como tomado:", error);
    } finally {
        setActionLoading(false);
    }
};


return (
    <div className={`${cardStyle.background} ${cardStyle.border} border-2 rounded-lg p-4 max-w-sm shadow-sm`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
                {name} {dosis}
            </h3>
            <span
                className={`${cardStyle.badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}
            >
                {status}
            </span>
        </div>

        {/* Información */}
        <div className="space-y-2 mb-4">
            <div className="flex">
                <span className="text-gray-600 font-medium text-sm">Frecuencia:</span>
                <span className="text-gray-800 text-sm ml-1">{frequency}</span>
            </div>
            <div className="flex">
                <span className="text-gray-600 font-medium text-sm min-w-20">Próxima toma:</span>
                <span className="text-gray-800 text-sm ml-1">{nextDose}</span>
            </div>
            <div className="flex">
                <span className="text-gray-600 font-medium text-sm min-w-20">Última toma:</span>
                <span className="text-gray-800 text-sm ml-1">{lastDose}</span>
            </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 flex-wrap">
            <Button
                title="Editar"
                action={() => console.log("editar")} // Aquí puedes abrir modal o redirigir
                tooltip="Editar medicamento"
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded"
                disabled={actionLoading}
            />

            <Button
                title="Eliminar"
                action={handleEliminar}
                tooltip="Eliminar medicamento"
                loading={actionLoading}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded"
            />

            {status.toLowerCase() !== "tomado" && (
                <Button
                    title="Marcar como tomado"
                    action={handleMarcarComoTomado}
                    tooltip="Marcar medicamento como tomado"
                    loading={actionLoading}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded"
                />
            )}

            <Link to={`/medicationdetail/${id}`}>
                <Button
                    title="Ver más"
                    tooltip="Ver detalle"
                    className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded"
                    disabled={actionLoading}
                />
            </Link>
        </div>
    </div>
);
};


export default MedicationCard;