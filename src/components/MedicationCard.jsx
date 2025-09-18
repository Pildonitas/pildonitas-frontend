import React, { useState } from "react";
import Button from "./Button";
import { deleteMedication, updateMedication } from "../services/MedicationServices";

const MedicationCard = ({
    id,
    medicamento,
    dosis,
    frecuencia,
    proximaToma,
    ultimaToma,
    estado = "PENDIENTE",
    onEditar,
    onUpdate,
    onMarcarComoTomado,
    onEliminar,
    
}) => {
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

    const cardStyle = getCardStyle(estado);

    //funciones para los botones que llaman al backend
    const handleEliminar = async() =>{
        try{
            await deleteMedication(id);
            onEliminar();
            if(onUpdate) onUpdate();
        }catch(error){
            console.error("Error al eliminar el medicamento:", error);
        }
    }
    

    const renderButton = () => {
        const commonEditButton = (
            <Button
                title="Editar"
                action={onEditar}
                tooltip="Editar información del medicamento"
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded"
            />
        );

        switch (estado.toLowerCase()) {
            case 'tomado':
                return (
                    <div className="flex gap-2">
                        {commonEditButton}
                        <Button
                            title="Eliminar"
                            action={handleEliminar}
                            tooltip="Eliminar el medicamento"
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded"
                        />
                    </div>
                );
            case 'retrasado':
                return (
                    <div className="flex gap-2">
                        <Button
                            title="Marcar como tomado"
                            action={onMarcarComoTomado}
                            tooltip="Marcar el medicamento como tomado"
                            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded"
                        />
                        {commonEditButton}
                    </div>
                );
            case 'pendiente':
                return (
                    <div className="flex gap-2">
                        <Button
                            title="Marcar como tomado"
                            action={onMarcarComoTomado}
                            tooltip="Marcar el medicamento como tomado"
                            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded"
                        />
                        {commonEditButton}
                    </div>
                );
            default:
                return (
                    <div className="flex gap-2">
                        {commonEditButton}
                        <Button
                            title="Eliminar"
                            action={onEliminar}
                            tooltip="Eliminar el medicamento"
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded"
                        />
                    </div>
                );
        }
    };
    return (
        <div className={`${cardStyle.background} ${cardStyle.border} border-2 rounded-lg p-4 max-w-sm shadow-sm`}>
            {/*Header con nombre y estado */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
                    {medicamento} {dosis}
                </h3>
                <span className={`${cardStyle.badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {estado}
                </span>
            </div>

            {/*Información del medicamento */}
            <div className="space-y-2 mb-4">
                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm min-w-20">Frecuencia:</span>
                    <span className="text-gray-800 text-sm ml-1">{frecuencia}</span>
                </div>

                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm min-w-20">Próxima toma:</span>
                    <span className="text-gray-800 text-sm ml-1">{proximaToma}</span>
                </div>

                <div className="flex">
                    <span className="text-gray-600 font-medium text-sm min-w-20">Última toma:</span>
                    <span className="text-gray-800 text-sm ml-1">{ultimaToma}</span>
                </div>
            </div>

            {/*Botones de acción dinamicos */}
            {renderButton()}
        </div>
    );
}
export default MedicationCard;