import React from 'react';
import { Equipment } from '../types/Equipment';
import { Settings, Droplets, Package, Clock, Activity } from 'lucide-react';
import './EquipmentList.css';

interface EquipmentListProps {
  equipments: Equipment[];
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipments }) => {
  
  const getProgressColor = (level: number) => {
    if (level < 30) return 'bg-red-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'OK': return 'status-ok';
      case 'DEGRADED': return 'status-degraded';
      case 'BROKEN': return 'status-broken';
      default: return '';
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Inventaire & Santé des Appareils</h2>
        <span className="text-sm text-gray-500">{equipments.length} appareils enregistrés</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="custom-table">
          <thead>
            <tr>
              <th><div className="flex items-center gap-2"><Settings size={14}/> Appareil</div></th>
              <th>Type</th>
              <th><div className="flex items-center gap-2"><Droplets size={14}/> Huile</div></th>
              <th><div className="flex items-center gap-2"><Package size={14}/> Consommable</div></th>
              <th><div className="flex items-center gap-2"><Clock size={14}/> Heures</div></th>
              <th><div className="flex items-center gap-2"><Activity size={14}/> État</div></th>
            </tr>
          </thead>
          <tbody>
            {equipments.map(eq => (
              <tr key={eq.id} className="row-hover">
                <td className="font-bold text-blue-900">{eq.name}</td>
                <td><span className="bg-slate-100 px-2 py-1 rounded text-xs">{eq.type}</span></td>
                
                {/* Jauge Huile */}
                <td>
                  <div className="progress-container">
                    <div className="progress-bar-bg">
                      <div 
                        className={`progress-fill ${getProgressColor(eq.oilLevel)}`} 
                        style={{ width: `${eq.oilLevel}%` }}
                      />
                    </div>
                    <span className={`percent-text ${eq.oilLevel < 30 ? 'text-red-600' : ''}`}>
                      {eq.oilLevel}%
                    </span>
                  </div>
                </td>

                {/* Jauge Consommable */}
                <td>
                  <div className="progress-container">
                    <div className="progress-bar-bg">
                      <div 
                        className={`progress-fill ${getProgressColor(eq.consumableLevel)}`} 
                        style={{ width: `${eq.consumableLevel}%` }}
                      />
                    </div>
                    <span className="percent-text">{eq.consumableLevel}%</span>
                  </div>
                </td>

                <td className="font-medium">{eq.hoursUsed.toLocaleString()} h</td>

                <td>
                  <span className={`status-badge ${getStatusClass(eq.status)}`}>
                    {eq.status === 'OK' && '✔ '}
                    {eq.status === 'Dégradé' && '⚠ '}
                    {eq.status === 'En panne' && '✖ '}
                    {eq.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentList;