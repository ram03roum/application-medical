import React from 'react';
import { CheckCircle, Bell, Filter } from 'lucide-react';
import AlertCard from './AlertCard';
import './AlertsList.css';

interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <div className="alerts-full-container">
      <div className="alerts-header">
        <h2 className="alerts-title">
          <Bell size={24} className="text-blue-600" />
          Centre de Notifications
          {alerts.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs">
              {alerts.length}
            </span>
          )}
        </h2>
        
        {/* Petit bouton de filtre pour le look "pro" */}
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">
          <Filter size={14} /> Filtrer
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="empty-state">
          <CheckCircle size={56} className="empty-icon" strokeWidth={1.5} />
          <h3 className="empty-title">Système Sous Contrôle</h3>
          <p className="empty-subtitle">
            L'IA n'a détecté aucune anomalie sur vos appareils médicaux.
          </p>
        </div>
      ) : (
        <div className="alerts-stack">
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsList;