import React, { useState, useEffect } from 'react';
import { Clock, Plus, Edit2, Trash2, Check, AlertTriangle } from 'lucide-react';

const MedicationCard = ({ medication, onEdit, onDelete, onMarkTaken }) => {
  const getStatusColor = () => {
    switch (medication.status) {
      case 'tomado': return '#10b981'; // green
      case 'pendiente': return '#f59e0b'; // orange
      case 'retrasado': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getStatusText = () => {
    switch (medication.status) {
      case 'tomado': return 'TOMADO';
      case 'pendiente': return 'PENDIENTE';
      case 'retrasado': return 'RETRASADO';
      default: return 'PENDIENTE';
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5);
  };

  const getTimeDifference = (scheduledTime) => {
    if (!scheduledTime) return '';
    const now = new Date();
    const scheduled = new Date();
    const [hours, minutes] = scheduledTime.split(':');
    scheduled.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diffMs = now - scheduled;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours > 0) {
      return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours < 0) {
      return `en ${Math.abs(diffHours)} hora${Math.abs(diffHours) > 1 ? 's' : ''}`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes > 0) {
        return `hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
      } else {
        return `en ${Math.abs(diffMinutes)} minuto${Math.abs(diffMinutes) > 1 ? 's' : ''}`;
      }
    }
  };

  return (
    <div 
      className="medication-card"
      style={{ 
        borderLeft: `4px solid ${getStatusColor()}`,
        backgroundColor: medication.status === 'tomado' ? '#f0fdfa' : 
                        medication.status === 'pendiente' ? '#fffbeb' : '#fef2f2'
      }}
    >
      <div className="card-header">
        <h3 className="medication-name">{medication.name}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="card-content">
        <div className="medication-info">
          <p className="info-item">
            <strong>Frecuencia:</strong> {medication.frequency}
          </p>
          
          {medication.nextDose && (
            <p className="info-item">
              <strong>Próxima toma:</strong> {formatTime(medication.nextDose)}
            </p>
          )}
          
          {medication.lastTaken && (
            <p className="info-item">
              <strong>Última toma:</strong> {getTimeDifference(medication.lastTaken)}
            </p>
          )}
          
          {medication.shouldTakeAt && medication.status === 'retrasado' && (
            <p className="info-item">
              <strong>Debía tomarse:</strong> {formatTime(medication.shouldTakeAt)} ({getTimeDifference(medication.shouldTakeAt)})
            </p>
          )}
          
          {medication.notes && (
            <p className="info-item">
              <strong>Notas:</strong> {medication.notes}
            </p>
          )}
          
          {medication.important && (
            <p className="info-item important">
              <AlertTriangle size={16} />
              <strong>Importante:</strong> {medication.important}
            </p>
          )}
        </div>
      </div>

      <div className="card-actions">
        {medication.status !== 'tomado' && (
          <button 
            className="action-button mark-taken"
            onClick={() => onMarkTaken(medication.id)}
          >
            <Check size={16} />
            Marcar como tomado
          </button>
        )}
        
        <button 
          className="action-button edit"
          onClick={() => onEdit(medication.id)}
        >
          <Edit2 size={16} />
          Editar
        </button>
        
        <button 
          className="action-button delete"
          onClick={() => onDelete(medication.id)}
        >
          <Trash2 size={16} />
          Eliminar
        </button>
      </div>
    </div>
  );
};

const AddMedicationForm = ({ onSave, onCancel, editingMedication }) => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: '',
    nextDose: '',
    notes: '',
    important: '',
    status: 'pendiente'
  });

  useEffect(() => {
    if (editingMedication) {
      setFormData({
        name: editingMedication.name || '',
        frequency: editingMedication.frequency || '',
        nextDose: editingMedication.nextDose || '',
        notes: editingMedication.notes || '',
        important: editingMedication.important || '',
        status: editingMedication.status || 'pendiente'
      });
    }
  }, [editingMedication]);

  const handleSubmit = () => {
    if (formData.name && formData.frequency) {
      onSave({
        ...formData,
        id: editingMedication?.id || Date.now()
      });
      
      if (!editingMedication) {
        setFormData({
          name: '',
          frequency: '',
          nextDose: '',
          notes: '',
          important: '',
          status: 'pendiente'
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="form-overlay">
      <div className="medication-form">
        <h3>{editingMedication ? 'Editar Medicamento' : 'Agregar Medicamento'}</h3>
        
        <div className="form-group">
          <label htmlFor="name">Nombre del medicamento *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Ibuprofeno 400mg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="frequency">Frecuencia *</label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            placeholder="Ej: Cada 8 horas, Diaria"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nextDose">Próxima toma</label>
          <input
            type="time"
            id="nextDose"
            name="nextDose"
            value={formData.nextDose}
            onChange={handleChange}
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
            placeholder="Ej: Tomar con desayuno"
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
            placeholder="Ej: Para presión arterial"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="tomado">Tomado</option>
            <option value="retrasado">Retrasado</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
          <button type="button" onClick={handleSubmit} className="btn-save">
            {editingMedication ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MisMedicamentos = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Ibuprofeno 400mg',
      frequency: 'Cada 8 horas',
      nextDose: '14:00',
      lastTaken: '06:00',
      status: 'tomado'
    },
    {
      id: 2,
      name: 'Vitamina D 1000 UI',
      frequency: 'Diaria',
      nextDose: '09:00',
      notes: 'Tomar con desayuno',
      status: 'pendiente'
    },
    {
      id: 3,
      name: 'Atenolol 25mg',
      frequency: 'Diaria',
      shouldTakeAt: '08:00',
      important: 'Para presión arterial',
      status: 'retrasado'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState(null);

  const handleAddMedication = () => {
    setEditingMedication(null);
    setShowForm(true);
  };

  const handleEditMedication = (id) => {
    const medication = medications.find(med => med.id === id);
    setEditingMedication(medication);
    setShowForm(true);
  };

  const handleDeleteMedication = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este medicamento?')) {
      setMedications(prev => prev.filter(med => med.id !== id));
    }
  };

  const handleMarkAsTaken = (id) => {
    setMedications(prev => prev.map(med => 
      med.id === id 
        ? { ...med, status: 'tomado', lastTaken: new Date().toTimeString().substring(0, 5) }
        : med
    ));
  };

  const handleSaveMedication = (medicationData) => {
    if (editingMedication) {
      setMedications(prev => prev.map(med => 
        med.id === editingMedication.id ? medicationData : med
      ));
    } else {
      setMedications(prev => [...prev, medicationData]);
    }
    setShowForm(false);
    setEditingMedication(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMedication(null);
  };

  return (
    <div className="app-container">
      <style jsx>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-icon {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .app-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .add-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .medications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .medication-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .medication-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .medication-name {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          flex: 1;
        }

        .status-badge {
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .card-content {
          margin-bottom: 20px;
        }

        .medication-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-item {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
          line-height: 1.4;
        }

        .info-item strong {
          color: #374151;
        }

        .info-item.important {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #dc2626;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-button.mark-taken {
          background: #10b981;
          color: white;
        }

        .action-button.mark-taken:hover {
          background: #059669;
        }

        .action-button.edit {
          background: #3b82f6;
          color: white;
        }

        .action-button.edit:hover {
          background: #2563eb;
        }

        .action-button.delete {
          background: #ef4444;
          color: white;
        }

        .action-button.delete:hover {
          background: #dc2626;
        }

        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .medication-form {
          background: white;
          padding: 30px;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .medication-form h3 {
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-cancel {
          padding: 10px 20px;
          border: 1px solid #d1d5db;
          background: white;
          color: #374151;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .btn-save {
          padding: 10px 20px;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-save:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 10px;
          }

          .medications-grid {
            grid-template-columns: 1fr;
          }

          .app-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .add-button {
            justify-content: center;
          }

          .card-actions {
            flex-direction: column;
          }

          .action-button {
            justify-content: center;
          }
        }
      `}</style>

      <header className="app-header">
        <div className="header-title">
          <div className="header-icon">
            💊
          </div>
          <h1 className="app-title">Mis Medicamentos</h1>
        </div>
        
        <button className="add-button" onClick={handleAddMedication}>
          <Plus size={20} />
          Agregar Medicamento
        </button>
      </header>

      <div className="medications-grid">
        {medications.map(medication => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onEdit={handleEditMedication}
            onDelete={handleDeleteMedication}
            onMarkTaken={handleMarkAsTaken}
          />
        ))}
      </div>

      {showForm && (
        <AddMedicationForm
          onSave={handleSaveMedication}
          onCancel={handleCancelForm}
          editingMedication={editingMedication}
        />
      )}
    </div>
  );
};

export default MisMedicamentos;