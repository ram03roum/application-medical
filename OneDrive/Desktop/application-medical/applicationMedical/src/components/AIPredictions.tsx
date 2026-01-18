import { Equipment } from '../types/Equipment';
import React from 'react';
import { TrendingUp, Wrench } from 'lucide-react';
import { predictFailure } from '../utils/predictFailure';
interface AIPredictionsProps {
  equipments: Equipment[];
}

const AIPredictions: React.FC<AIPredictionsProps> = ({ equipments }) => {
  const getRiskColor = (risk: string) => {
    return risk === 'Faible' 
      ? 'text-green-600' 
      : risk === 'Moyen' 
      ? 'text-yellow-600' 
      : 'text-red-600';
  };

  const getRiskBadgeColor = (risk: string) => {
    return risk === 'Faible' 
      ? 'bg-green-100 text-green-800'
      : risk === 'Moyen'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';
  };

  const getProgressColor = (level: number) => {
    return level < 30 
      ? 'bg-red-500' 
      : level < 50 
      ? 'bg-yellow-500' 
      : 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} />
          <h2 className="text-2xl font-bold">Prédictions IA - Machine Learning</h2>
        </div>
        <p className="text-purple-100">
          Modèle : Random Forest | Facteurs : Huile, Heures, Consommables, Maintenance
        </p>
      </div>

      {/* Predictions Cards */}
      <div className="grid gap-6">
        {equipments.map(eq => {
          const prediction = predictFailure(eq);
          
          return (
            <div key={eq.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                {/* Equipment Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{eq.name}</h3>
                    <p className="text-gray-500">{eq.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Risque de Panne</p>
                    <p className={`text-3xl font-bold ${getRiskColor(prediction.risk)}`}>
                      {prediction.probability}%
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getRiskBadgeColor(prediction.risk)}`}>
                      {prediction.risk}
                    </span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Niveau d'huile</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(eq.oilLevel)}`}
                          style={{ width: `${eq.oilLevel}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{eq.oilLevel}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Consommable</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(eq.consumableLevel)}`}
                          style={{ width: `${eq.consumableLevel}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{eq.consumableLevel}%</span>
                    </div>
                  </div>
                </div>

                {/* Equipment Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500">Heures d'utilisation</p>
                    <p className="font-bold text-gray-800">{eq.hoursUsed}h</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-500">Dernière maintenance</p>
                    <p className="font-bold text-gray-800">{eq.lastMaintenance}</p>
                  </div>
                </div>

                {/* Recommendation */}
                {prediction.risk !== 'Faible' && (
                  <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center gap-2">
                      <Wrench className="text-yellow-600" size={20} />
                      <p className="font-semibold text-yellow-800">
                        Action recommandée : {prediction.risk === 'Élevé' 
                          ? 'Maintenance urgente' 
                          : 'Planifier une maintenance'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIPredictions;