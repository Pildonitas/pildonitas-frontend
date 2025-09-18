import React, { useEffect, useState } from 'react'
import MedicationCard from '../components/MedicationCard'
import { getMedication } from '../services/MedicationServices';


const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Cargar los medicamentos desde la API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMedication();
                setMedications(data);
            } catch (error) {
                console.error("Error cargando los medicamentos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>📋 Medicamentos del Usuario</h1>
            <button onClick={() => setShowForm(true)}>Agregar Medicamento</button>

            {showForm && (
                <Form
                    onSubmit={handleAgregarMedicamento}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div
                style={{
                    marginTop: "30px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {medications.map((med) => (
                    <MedicationCard
                        key={med.id}
                        {...med}
                        onMarcarComoTomado={() => marcarComoTomado(med.id)}
                        onEliminar={() => eliminarMedicamento(med.id)}
                        onEditar={() => editarMedicamento(med.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MedicationList;