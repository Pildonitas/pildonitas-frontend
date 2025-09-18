import React, { useEffect, useState } from 'react'
import MedicationCard from '../components/MedicationCard'
//import { getMedication } from '../services/MedicationServices';
import { getMedication } from '../services/TestServices';
import MedForm from '../components/Form';
import { ClipboardList } from "lucide-react";


const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false)
    const [editingMed, setEditingMed] = useState(null)

    //Cargar los medicamentos desde la API 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getMedication();
                setMedications(data);
            } catch (error) {
                console.error("Error cargando los medicamentos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando lista de medicamentos...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex items-center space-x-2">
                <ClipboardList className="w-6 h-6 text-sky-500" />
                <h1 className="text-xl font-bold text-gray-800">Mis Medicamentos</h1>
            </div>
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
                        id={med.id} // solo pasamos el ID
                        onUpdate={() => console.log("Lista actualizada")}
                    />
                ))}
            </div>
        </div>
    );
};

export default MedicationList;