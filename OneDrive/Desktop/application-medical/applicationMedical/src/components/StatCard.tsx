import React from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  trend?: string; // Optionnel : pour ajouter "+5% ce mois"
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue' 
}) => {
  
  return (
    <div className={`stat-card variant-color stat-${color}`}>
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
        
        {/* Petit détail design : une barre de couleur discrète sous le titre */}
        <div className={`stat-underline bg-${color}-500`} style={{
          height: '3px', width: '20px', borderRadius: '2px', marginTop: '8px'
        }}></div>
      </div>
      
      <div className="stat-icon-wrapper">
        <Icon size={32} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default StatCard;