import React from 'react';
import { Activity, Plus, ShieldCheck } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onAddEquipment: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEquipment }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-flex">
          
          {/* Section Logo et Titre */}
          <div className="logo-section">
            <div className="icon-wrapper">
              <Activity size={32} strokeWidth={2.5} />
            </div>
            <div className="text-content">
              <h1 className="main-title">
                MedPredict <span className="ai-badge">IA</span>
              </h1>
              <div className="sub-title">
                <ShieldCheck size={14} />
                <span>Maintenance Prédictive Médicale</span>
              </div>
            </div>
          </div>

          {/* Section Actions */}
          <div className="action-section">
            <button 
              onClick={onAddEquipment} 
              className="btn-add"
              aria-label="Ajouter un nouvel appareil"
            >
              <Plus size={20} />
              <span>Nouvel Appareil</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;