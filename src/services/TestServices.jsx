// services/TestServices

export const getMedication = async () => {
    // Simula una lista de medicamentos con IDs
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ];
};

export const getMedicationById = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        id,
        name: `Medicamento ${id}`,
        dosis: "200mg",
        frequency: "Cada 8 horas",
        nextDose: "14:00",
        lastDose: "06:00",
        status: ["pendiente", "tomado", "retrasado"][id % 3],
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
