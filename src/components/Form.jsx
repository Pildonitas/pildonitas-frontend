import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMedicationById, createMedication, updateMedication } from '../services/MedicationServices';
import Button from './Button';

const MedForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        frequency: '',
        nextDose: '',
        lastDose: '',
        dosis: '',
        status: 'pendiente',
        notes: '',
        important:''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(isEditing);
    const [error, setError] = useState(null);

    //cargamos datos del medicamento si estamos editando
    useEffect(() => {
        if (isEditing) {
            const loadMedicationData = async () => {
                try {
                    setIsLoadingData(true);
                    const medication = await getMedicationById(id);
                    setFormData({
                        name: medication.name || '',
                        frequency: medication.frequency || '',
                        nextDose: medication.nextDose || '',
                        lastDose: medication.lastDose || '',
                        dosis: medication.dosis || '',
                        status: medication.status || 'pendiente',
                        notes: medication.notes || '',
                        important: medication.important || ''
                    });
                } catch (error) {
                    console.error("Error al cargar los datos del medicamento:", error);
                    setError(error);
                } finally {
                    setIsLoadingData(false);
                }
            };
            loadMedicationData();
        }
    },[id, isEditing]);
    
    const handleChange = (e) => {
        setFormData(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.name || !formData.frequency){
            alert('Por favor completa los campos obligatorios');
            return;
        }
        try{
            setIsLoading(true);
            if(isEditing){
                // Actualizar medicamento existente
                await updateMedication(id, formData);
            }else{
                // Crear nuevo medicamento
                await createMedication(formData);
            }
            //Redirigir a la lista de medicamentos
            navigate('/medicationslist');

        }catch(error){
            console.error("Error al guardar el medicamento:", error);
            setError(error);
        }finally{
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/medicationslist');
    };
    if(isLoadingData){
        return(
            <div className="loading-container">
                <div className="loading">Cargando datos del medicamento...</div>
            </div>
        )
    };


    return (
        <div className="form-container">
            <style>{`
                .form-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .form-header {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }

                .form-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .form-icon {
                    width: 40px;
                    height: 40px;
                    background: #3b82f6;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .medication-form {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #374151;
                    font-size: 14px;
                }

                .required {
                    color: #dc2626;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    box-sizing: border-box;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                }

                .form-group input::placeholder {
                    color: #9ca3af;
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #e5e7eb;
                }

                .btn-cancel {
                    padding: 12px 24px;
                    border: 1px solid #d1d5db;
                    background: white;
                    color: #374151;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                }

                .btn-cancel:hover:not(:disabled) {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }

                .btn-save {
                    padding: 12px 24px;
                    border: none;
                    background: #3b82f6;
                    color: white;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                    min-width: 120px;
                }

                .btn-save:hover:not(:disabled) {
                    background: #2563eb;
                }

                .btn-save:disabled,
                .btn-cancel:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 300px;
                }

                .loading {
                    font-size: 18px;
                    color: #6b7280;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .form-container {
                        padding: 10px;
                    }

                    .medication-form {
                        padding: 20px;
                    }

                    .form-actions {
                        flex-direction: column;
                    }

                    .btn-cancel,
                    .btn-save {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            <header className="form-header">
                <h1 className="form-title">
                    <div className="form-icon">💊</div>
                    {isEditing ? 'Editar Medicamento' : 'Agregar Medicamento'}
                </h1>
                </header>

                <form className="medication-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Nombre del medicamento <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej: Ibuprofeno 400mg"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="frequency">
                        Frecuencia <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        placeholder="Ej: Cada 8 horas, Diaria, Una vez al día"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dosis">
                        Dosis <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="dosis"
                        name="dosis"
                        value={formData.dosis}
                        onChange={handleChange}
                        placeholder="Ej: 2 dosis de un comprimido de 200 mg al día"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nextDose">Hora de toma</label>
                    <input
                        type="time"
                        id="nextDose"
                        name="nextDose"
                        value={formData.nextDose}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notas</label>
                    <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Ej: Tomar con comida, Después del desayuno"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="important">Información importante</label>
                    <input
                        type="text"
                        id="important"
                        name="important"
                        value={formData.important}
                        onChange={handleChange}
                        placeholder="Ej: Para la presión arterial, Evitar alcohol"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Estado</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="tomado">Tomado</option>
                        <option value="retrasado">Retrasado</option>
                    </select>
                </div>

                <div className="form-actions">
                    <Button 
                        title="Cancelar"
                        action={handleCancel}
                        tooltip="Cancelar"
                        type="button" 
                        className="btn-cancel"
                        loading={isLoading}
                    >
                    </Button>
                    <Button 
                        title={isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
                        type="submit" 
                        tooltip="Guardar"
                        className="btn-save"
                        loading={isLoading}
                        
                    >
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MedForm;