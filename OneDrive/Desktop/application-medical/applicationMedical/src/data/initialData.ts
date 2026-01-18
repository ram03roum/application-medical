import { Equipment } from '../types/Equipment';

export const initialEquipments: Equipment[] = [
  {
    id: '1',
    name: 'Scanner IRM-A1',
    type: 'Scanner',
    installDate: '2020-03-15',
    oilLevel: 25,
    consumableLevel: 15,
    hoursUsed: 8500,
    lastMaintenance: '2024-06-10',
    status: 'Dégradé' as 'Dégradé',  
  },
  {
    id: '2',
    name: 'Respirateur R-300',
    type: 'Respirateur',
    installDate: '2021-08-20',
    oilLevel: 75,
    consumableLevel: 60,
    hoursUsed: 3200,
    lastMaintenance: '2024-12-01',
    status: 'OK' as 'OK',            
  },
  {
    id: '3',
    name: 'Échographe Echo-Pro',
    type: 'Échographe',
    installDate: '2019-11-05',
    oilLevel: 45,
    consumableLevel: 35,
    hoursUsed: 6800,
    lastMaintenance: '2024-07-15',
    status: 'OK' as 'OK',           
  }
];
