// src/types/Equipment.ts

export interface Equipment {
  id: string;
  name: string;
  type: string;
  installDate: string;
  oilLevel: number;
  consumableLevel: number;
  hoursUsed: number;
  lastMaintenance: string;
  status: string;
}

export interface Prediction {
  probability: number;
  risk: 'Faible' | 'Moyen' | 'Élevé';
  factors?: {
    oilScore: number;
    hoursScore: number;
    consumableScore: number;
    maintenanceScore: number;
    daysSinceMaintenance: number;
  };
}