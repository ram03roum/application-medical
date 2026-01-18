import React from "react";
import { TABS } from "../utils/constants";
import "./Navigation.css";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TABS.DASHBOARD, label: "Tableau de Bord", icon: "📊" },
    { id: TABS.EQUIPMENTS, label: "Appareils", icon: "🏥" },
    { id: TABS.ALERTS, label: "Alertes", icon: "🔔" },
    { id: TABS.AI, label: "Prédictions IA", icon: "🤖", special: "tab-ai" },
  ];

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="tabs-list">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-button ${activeTab === tab.id ? "active" : ""} ${tab.special || ""}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              
              {/* Badge optionnel pour les alertes si nécessaire */}
              {tab.id === TABS.ALERTS && (
                <span className="notification-dot"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;