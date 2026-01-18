import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import EquipmentList from './components/EquipmentList';
import AlertsList from './components/AlertsList';
import AIPredictions from './components/AIPredictions';
import EquipmentForm from './components/EquipmentForm';
import { Equipment } from './types/Equipment';
import { initialEquipments } from './data/initialData';
import { TABS, THRESHOLDS, EQUIPMENT_STATUS } from './utils/constants';


// Typage pour une alerte
export interface Alert {
  id: string;
  equipmentId: number | string;
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

const App: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(TABS.DASHBOARD);

  // Génération automatique des alertes
  useEffect(() => {
    const newAlerts: Alert[] = [];

    equipments.forEach(eq => {
      if (eq.oilLevel < THRESHOLDS.OIL_CRITICAL) {
        newAlerts.push({
          id: `alert-oil-${eq.id}`,
          equipmentId: eq.id,
          type: 'Critique',
          message: `${eq.name} : Niveau d'huile critique (${eq.oilLevel}%)`,
          severity: 'high'
        });
      } else if (eq.oilLevel < THRESHOLDS.OIL_WARNING) {
        newAlerts.push({
          id: `alert-oil-${eq.id}`,
          equipmentId: eq.id,
          type: 'Attention',
          message: `${eq.name} : Niveau d'huile faible (${eq.oilLevel}%)`,
          severity: 'medium'
        });
      }

      if (eq.consumableLevel < THRESHOLDS.CONSUMABLE_CRITICAL) {
        newAlerts.push({
          id: `alert-cons-${eq.id}`,
          equipmentId: eq.id,
          type: 'Critique',
          message: `${eq.name} : Produit consommable critique (${eq.consumableLevel}%)`,
          severity: 'high'
        });
      }

      if (eq.hoursUsed > THRESHOLDS.HOURS_HIGH) {
        newAlerts.push({
          id: `alert-hours-${eq.id}`,
          equipmentId: eq.id,
          type: 'Maintenance',
          message: `${eq.name} : Maintenance recommandée (${eq.hoursUsed}h d'utilisation)`,
          severity: 'medium'
        });
      }
    });

    setAlerts(newAlerts);
  }, [equipments]);

  // Ajouter un nouvel équipement
  const handleAddEquipment = (formData: Omit<Equipment, 'id'>) => {
    const newEquipment: Equipment = {
      ...formData,
      id: Date.now().toString(), 
    };
    setEquipments([...equipments, newEquipment]);
    setShowForm(false);
  };

  // Contenu selon l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case TABS.DASHBOARD:
        return <Dashboard equipments={equipments} alerts={alerts} />;
      case TABS.EQUIPMENTS:
        return <EquipmentList equipments={equipments} />;
      case TABS.ALERTS:
        return <AlertsList alerts={alerts} />;
      case TABS.AI:
        return <AIPredictions equipments={equipments} />;
      default:
        return <Dashboard equipments={equipments} alerts={alerts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddEquipment={() => setShowForm(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {showForm && (
        <EquipmentForm 
          onSubmit={handleAddEquipment}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default App;
