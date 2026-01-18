import React from 'react';
import { Database, CheckCircle, AlertTriangle, Bell, ArrowRight } from 'lucide-react';
import StatCard from './StatCard';
import AlertCard from './AlertCard';
import './Dashboard.css';

// Types déjà exportés ou importés
export interface Equipment {
  id: string;          
  name: string;
  type: string;
  oilLevel: number;
  hoursUsed: number;
  consumableLevel: number;
  lastMaintenance: string;
  status: 'OK' | 'Dégradé' | 'En panne';
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

interface DashboardProps {
  equipments: Equipment[];
  alerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ equipments, alerts }) => {
  // Logique de calcul des stats
  const stats = {
    total: equipments.length,
    ok: equipments.filter(e => e.status === 'OK').length,
    degraded: equipments.filter(e => e.status === 'Dégradé').length,
    critical: alerts.filter(a => a.severity === 'high').length
  };

  return (
    <div className="dashboard-container">
      {/* Grille des Statistiques */}
      <div className="stats-grid">
        <StatCard 
          title="Parc Appareils" 
          value={stats.total} 
          icon={Database} 
          color="blue" 
        />
        <StatCard 
          title="Opérationnels" 
          value={stats.ok} 
          icon={CheckCircle} 
          color="green" 
        />
        <StatCard 
          title="Sous Surveillance" 
          value={stats.degraded} 
          icon={AlertTriangle} 
          color="yellow" 
        />
        <StatCard 
          title="Alertes IA" 
          value={stats.critical} 
          icon={Bell} 
          color="red" 
        />
      </div>

      {/* Section des Alertes Récentes */}
      {alerts.length > 0 ? (
        <div className="alerts-section">
          <div className="section-header">
            <h2 className="section-title">
              <Bell className="text-red-500 animate-bounce" size={24} />
              Alertes de Maintenance Récentes
              {stats.critical > 0 && <span className="alert-count-badge">{stats.critical} CRITIQUE</span>}
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
              Voir tout <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="alerts-list">
            {alerts.slice(0, 5).map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      ) : (
        /* État vide si aucune alerte */
        <div className="mt-8 p-12 text-center bg-green-50 rounded-20 border border-green-100">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <h3 className="text-green-800 font-bold text-lg">Système Nominal</h3>
          <p className="text-green-600">Aucune alerte critique détectée par l'IA actuellement.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;