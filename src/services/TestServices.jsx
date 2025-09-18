// services/TestServices

export const getMedication = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
        {
            id: 1,
            name: "Paracetamol",
            dosis: "500 mg",
            frecuencia: "Cada 8 horas",
            estado: "Activo",
        },
        {
            id: 2,
            medicamento: "Ibuprofeno",
            dosis: "400 mg",
            frecuencia: "Cada 12 horas",
            estado: "Activo",
        },
        {
            id: 3,
            medicamento: "Amoxicilina",
            dosis: "250 mg",
            frecuencia: "Cada 8 horas",
            estado: "Inactivo",
        },
    ];
};

// services/TestServices.js (agregar al final)

export const getMedicationsForToday = async () => {
    // Simular un delay de fetch
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Lista de ejemplo de medicamentos programados para hoy
    return [
        {
            id: 1,
            name: "Paracetamol",
            dosis: "500 mg",
            nextDose: "08:00",
            lastDose: "20:00",
            status: "pendiente",
        },
        {
            id: 2,
            name: "Ibuprofeno",
            dosis: "400 mg",
            nextDose: "12:00",
            lastDose: "04:00",
            status: "retrasado",
        },
        {
            id: 3,
            name: "Amoxicilina",
            dosis: "250 mg",
            nextDose: "18:00",
            lastDose: "10:00",
            status: "tomado",
        },
    ];
};



export const getMedicationById = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        id,
        medicamento: `Medicamento ${id}`, // renombrado
        dosis: "200mg",
        frecuencia: "Cada 8 horas",       // renombrado
        estado: ["pendiente", "tomado", "retrasado"][id % 3], // renombrado
    };
};


export const deleteMedication = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Medicamento ${id} eliminado (simulado)`);
};

export const updateMedication = async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Medicamento ${id} actualizado (simulado)`, data);
};
