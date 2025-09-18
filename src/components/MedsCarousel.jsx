import React, { useState, useEffect } from "react";
import MedicationCard from "./MedicationCard";

const MedicationCarousel = ({ medications = [], onUpdate, autoScrollInterval = 5000 }) => {
    const [startIndex, setStartIndex] = useState(0);
    const cardsToShow = 3;
    const total = medications.length;

    useEffect(() => {
        if (total === 0) return;
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % total);
        }, autoScrollInterval);
        return () => clearInterval(interval);
    }, [total, autoScrollInterval]);

    if (total === 0) return <p>No hay medicamentos para hoy</p>;

    const cardWidth = 100 / cardsToShow;

    return (
        <div className="relative flex items-center">
            {/* Botón anterior */}
            <div className="flex-shrink-0">
                <button
                    onClick={() => setStartIndex((prev) => (prev - 1 + total) % total)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                >
                    ◀
                </button>
            </div>

            {/* Contenedor de cards */}
            <div className="overflow-hidden flex-1 mx-2">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        width: `${(total * 100) / cardsToShow}%`,
                        transform: `translateX(-${startIndex * cardWidth}%)`,
                    }}
                >
                    {medications.map((med) => (
                        <div key={med.id} className="flex-shrink-0" style={{ width: `${cardWidth}%` }}>
                            <MedicationCard
                                id={med.id}
                                onUpdate={(id, newStatus) => onUpdate && onUpdate(id, newStatus)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón siguiente */}
            <div className="flex-shrink-0">
                <button
                    onClick={() => setStartIndex((prev) => (prev + 1) % total)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default MedicationCarousel;
