import React, { useState } from 'react';
import { EQUIPMENT_TYPES, EQUIPMENT_STATUS } from '../utils/constants';
import { Equipment } from '../types/Equipment';
import { X, Save, Settings, Thermometer } from 'lucide-react'; // Ajout d'icônes
import './EquipmentForm.css';

interface EquipmentFormProps {
  onSubmit: (equipment: Equipment) => void;
  onCancel: () => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Equipment, 'id'>>({
    name: '',
    type: EQUIPMENT_TYPES[0],
    installDate: '',
    oilLevel: 100,
    consumableLevel: 100,
    hoursUsed: 0,
    lastMaintenance: '',
    status: EQUIPMENT_STATUS.OK,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['oilLevel', 'consumableLevel', 'hoursUsed'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEquipment: Equipment = {
      id: crypto.randomUUID(),
      ...formData
    };
    onSubmit(newEquipment);
  };

  return (
    <div className="fixed inset-0 modal-overlay">
      <div className="form-card">
        <div className="form-header flex items-center justify-between">
          <h2 className="form-title">Nouvel Appareil Médical</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="label-text">Nom du modèle</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="ex: Scanner IRM X100" />
            </div>
            <div className="input-group">
              <label className="label-text">Catégorie</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="input-field">
                {EQUIPMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="label-text">Date d'installation</label>
              <input type="date" name="installDate" value={formData.installDate} onChange={handleInputChange} required className="input-field" />
            </div>
            <div className="input-group">
              <label className="label-text">Dernière Maintenance</label>
              <input type="date" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleInputChange} required className="input-field" />
            </div>
          </div>

          <div className="input-group">
            <div className="flex justify-between items-center mb-1">
              <label className="label-text">Niveau de lubrifiant / Huile</label>
              <span className={`text-sm font-bold ${formData.oilLevel < 20 ? 'text-red-500' : 'text-blue-600'}`}>{formData.oilLevel}%</span>
            </div>
            <input type="range" name="oilLevel" min="0" max="100" value={formData.oilLevel} onChange={handleInputChange} className="range-slider" />
          </div>

          <div className="input-group">
            <div className="flex justify-between items-center mb-1">
              <label className="label-text">Stock Consommables</label>
              <span className="text-sm font-bold text-green-600">{formData.consumableLevel}%</span>
            </div>
            <input type="range" name="consumableLevel" min="0" max="100" value={formData.consumableLevel} onChange={handleInputChange} className="range-slider" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="label-text">Heures de fonctionnement</label>
              <input type="number" name="hoursUsed" value={formData.hoursUsed} onChange={handleInputChange} className="input-field" />
            </div>
            <div className="input-group">
              <label className="label-text">État opérationnel</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="input-field">
                <option value={EQUIPMENT_STATUS.OK}>✅ Opérationnel</option>
                <option value={EQUIPMENT_STATUS.DEGRADED}>⚠️ Dégradé</option>
                <option value={EQUIPMENT_STATUS.BROKEN}>❌ En Panne</option>
              </select>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" onClick={onCancel} className="btn-cancel">Annuler</button>
            <button type="submit" className="btn-submit flex items-center justify-center gap-2">
              <Save size={18} /> Enregistrer l'appareil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentForm;