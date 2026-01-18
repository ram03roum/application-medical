import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import './AlertCard.css';

interface Alert {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  // Sélection de l'icône et de la classe selon la sévérité
  const getSeverityConfig = () => {
    switch (alert.severity) {
      case 'high':
        return { 
          className: 'severity-high', 
          Icon: AlertTriangle, 
          badge: 'bg-red-200 text-red-900' 
        };
      case 'medium':
        return { 
          className: 'severity-medium', 
          Icon: AlertCircle, 
          badge: 'bg-yellow-200 text-yellow-900' 
        };
      case 'low':
        return { 
          className: 'severity-low', 
          Icon: Info, 
          badge: 'bg-blue-200 text-blue-900' 
        };
      default:
        return { className: '', Icon: Info, badge: '' };
    }
  };

  const config = getSeverityConfig();

  return (
    <div className={`alert-card ${config.className}`}>
      <div className="alert-content">
        <span className={`alert-badge ${config.badge}`}>
          {alert.type}
        </span>
        <p className="alert-message">{alert.message}</p>
      </div>
      
      <div className="alert-icon-wrapper">
        <config.Icon 
          size={22} 
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

export default AlertCard;