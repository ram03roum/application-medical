export const EQUIPMENT_TYPES: string[] = [
  "Scanner",
  "Respirateur",
  "Échographe",
  "Moniteur",
  "Défibrillateur",
];

export const EQUIPMENT_STATUS = {
  OK: "OK",
  DEGRADED: "Dégradé",
  BROKEN: "En panne",
} as const;

export const ALERT_SEVERITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const THRESHOLDS = {
  OIL_CRITICAL: 20,
  OIL_WARNING: 40,
  CONSUMABLE_CRITICAL: 20,
  CONSUMABLE_WARNING: 40,
  HOURS_HIGH: 8000,
  HOURS_MEDIUM: 5000,
  MAINTENANCE_CRITICAL: 180,
  MAINTENANCE_WARNING: 90,
} as const;

export const TABS = {
  DASHBOARD: "dashboard",
  EQUIPMENTS: "equipments",
  ALERTS: "alerts",
  AI: "ai",
} as const;
