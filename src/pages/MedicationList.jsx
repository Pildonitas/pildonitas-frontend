import React, { useEffect, useState } from "react"
import MedicationCard from "../components/MedicationCard"
// 🔹 cuando tengas backend real, cambia este import:
import { getMedication } from "../services/TestServices"
import { ClipboardList } from "lucide-react"

const MedicationList = () => {
    const [medications, setMedications] = useState([])
    const [loading, setLoading] = useState(true)

    // Cargar los medicamentos desde la API (solo IDs + info mínima)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await getMedication()
                setMedications(data) // aquí debería venir al menos {id}
            } catch (error) {
                console.error("Error cargando los medicamentos:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <p>Cargando lista de medicamentos...</p>
    }

    return (
        <div style={{ padding: "20px" }}>
            {/* Título con ícono */}
            <div className="flex items-center space-x-2">
                <ClipboardList className="w-6 h-6 text-sky-500" />
                <h1 className="text-xl font-bold text-gray-800">Mis Medicamentos</h1>
            </div>

            {/* Grid de Cards */}
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
                        id={med.id} // 🔹 la Card se encarga de traer su info con getMedicationById
                        onUpdate={() => {
                            // callback opcional si quieres refrescar lista al cambiar estado
                            console.log("Lista actualizada")
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default MedicationList
