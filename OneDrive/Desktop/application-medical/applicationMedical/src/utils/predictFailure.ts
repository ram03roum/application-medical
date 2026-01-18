
import { THRESHOLDS } from './constants';
import { Equipment } from '../types/Equipment';
export const predictFailure = (equipment: Equipment) => {
  // Facteurs de risque
  const oilScore = equipment.oilLevel < 30 
    ? 0.4 
    : equipment.oilLevel < 50 
    ? 0.2 
    : 0;

  const hoursScore = equipment.hoursUsed > THRESHOLDS.HOURS_HIGH 
    ? 0.3 
    : equipment.hoursUsed > THRESHOLDS.HOURS_MEDIUM 
    ? 0.15 
    : 0;

  const consumableScore = equipment.consumableLevel < THRESHOLDS.CONSUMABLE_CRITICAL 
    ? 0.2 
    : equipment.consumableLevel < THRESHOLDS.CONSUMABLE_WARNING 
    ? 0.1 
    : 0;

  const daysSinceMaintenance = Math.floor(
    (Date.now() - new Date(equipment.lastMaintenance).getTime()) / (1000 * 60 * 60 * 24)
  );

  const maintenanceScore = daysSinceMaintenance > THRESHOLDS.MAINTENANCE_CRITICAL 
    ? 0.2 
    : daysSinceMaintenance > THRESHOLDS.MAINTENANCE_WARNING 
    ? 0.1 
    : 0;

  // Calcul du risque global (0-1)
  const riskScore = Math.min(
    oilScore + hoursScore + consumableScore + maintenanceScore + (Math.random() * 0.1),
    0.95
  );

  return {
    probability: Math.round(riskScore * 100),
    risk: riskScore > 0.6 ? 'Élevé' : riskScore > 0.35 ? 'Moyen' : 'Faible',
    factors: {
      oilScore,
      hoursScore,
      consumableScore,
      maintenanceScore,
      daysSinceMaintenance
    }
  };
};